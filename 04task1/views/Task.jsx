import React from 'react';
import './Task.less';
import { getTaskList, postTask, deleteTask, patchTaskList } from '../api/index';
import {
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Table,
  Tag,
  DatePicker,
  message,
} from 'antd';

/**对日期处理的方法 */

const addZero = function (text) {
  text = String(text);
  return text.length > 1 ? text : '0' + text;
};

const formateDate = function (date) {
  let arr = date.match(/\d+/g);
  let [_, month, day, hours = '00', minutes = '00'] = arr;
  return `${addZero(month)}-${addZero(day)} ${addZero(hours)}:${addZero(
    minutes
  )}`;
};

class Task extends React.Component {
  state = {
    tableData: [],
    tableLoading: false,
    modalVisable: false,
    confirmLoading: false,
    selectValue: 0,
  };
  /**
   * 请求服务器的数据
   */
  queryData = async () => {
    try {
      //开启加载显示
      this.setState({ tableLoading: true });
      //发起请求
      let { code, list } = await getTaskList(this.state.selectValue);
      if (+code !== 0) list = [];
      this.setState({
        tableData: list,
      });
    } catch (_) {}
    this.setState({ tableLoading: false });
  };

  cancel = () => {
    this.setState({ modalVisable: false, confirmLoading: false });
    this.formInstance.resetFields();
  };
  submit = async () => {
    try {
      //表单校验
      await this.formInstance.validateFields();
      //收集表单数据
      let { task, time } = this.formInstance.getFieldsValue();
      time = time.format('YYYY-MM-DD HH:mm:ss');
      //开启显示加载状态
      this.setState({ confirmLoading: true });
      //发送请求
      let { code } = await postTask(task, time);
      if (+code !== 0) {
        message.error('sorry,submit failed!');
        this.setState({ confirmLoading: false });
      } else {
        message.success('submit success');
        this.cancel();
        this.queryData();
      }
    } catch (error) {
      message.error('表单验证失败');
    }
  };

  clickTag = (index) => {
    if (this.state.selectValue === index) return;
    //更改state是异步的操作，
    this.setState(
      {
        selectValue: index,
      },
      () => {
        this.queryData();
      }
    );
  };
  //删除一条数据记录
  deleteTask = async (id) => {
    try {
      this.setState({ tableLoading: true });
      let { code } = await deleteTask(id);
      if (+code !== 0) {
        message.error('delete failed!');
      } else {
        this.queryData();
        message.success('delete success');
      }
    } catch (_) {}
    this.setState({ tableLoading: false });
  };
  //完成task
  completeTask = async (id) => {
    try {
      this.setState({ tableLoading: true });
      let { code } = await patchTaskList(id);
      if (+code !== 0) {
        message.error('update failed!');
      } else {
        this.queryData();
        message.success('update success');
      }
    } catch (_) {}
    this.setState({ tableLoading: false });
  };
  /**
   * dataIndex  对应一条数据记录中的字段
   * title      表格头部的列名
   *
   * render 处理需要渲染的数据，有多少行数据，render就会渲染多少次
   * render: (text, record) => {}  text 当前这一行这一列单元格存储的内容
   *  record  这一行记录的数据
   */
  colums = [
    {
      title: 'id',
      dataIndex: 'id',
      align: 'center',
      width: '8%',
    },
    {
      title: 'task',
      dataIndex: 'task',
      width: '50%',
      ellipsis: true,
    },
    {
      title: 'state',
      dataIndex: 'state',
      align: 'center',
      width: '10%',
      render: (text) => (+text === 2 ? '已完成' : '未完成'),
    },
    {
      title: 'complete',
      dataIndex: 'time',
      align: 'center',
      width: '15%',
      render: (_, record) => {
        let { state, time, complete } = record;
        if (+state === 2) {
          time = complete;
        }
        return formateDate(time);
      },
    },
    {
      title: 'operate',
      render: (_, record) => {
        let { state, id } = record;
        return (
          <>
            <Popconfirm
              title="确定要删除吗"
              onConfirm={this.deleteTask.bind(null, id)}
            >
              <Button type="link">删除</Button>
            </Popconfirm>
            {+state !== 2 ? (
              <Popconfirm
                title="确定完成此任务吗"
                onConfirm={this.completeTask.bind(null, id)}
              >
                <Button type="link">完成</Button>
              </Popconfirm>
            ) : null}
          </>
        );
      },
    },
  ];
  render() {
    let { tableData, tableLoading, modalVisable, confirmLoading, selectValue } =
      this.state;
    return (
      <div className="task-box">
        <div className="header">
          <h2 className="title">任务管理系统</h2>
          <Button
            type="primary"
            onClick={() => {
              this.setState({
                modalVisable: true,
              });
            }}
          >
            点击新增
          </Button>
        </div>
        <div className="tag-box">
          {['全部', '未完成', '已完成'].map((item, index) => {
            return (
              <Tag
                key={index}
                color={selectValue === index ? '#1677ff' : ''}
                onClick={this.clickTag.bind(null, index)}
              >
                {item}
              </Tag>
            );
          })}
        </div>
        {/* <div className="tag-box">
          <Tag>全部</Tag>
          <Tag
            color="success"
            onClick={() => {
              this.setState({ selectValue: 2 });
            }}
          >
            已完成
          </Tag>
          <Tag
            color="processing"
            onClick={() => {
              this.setState({ selectValue: 1 });
            }}
          >
            未完成
          </Tag>
        </div> */}

        <div className="list">
          <Table
            dataSource={tableData}
            columns={this.colums}
            loading={tableLoading}
            pagination={false}
            rowKey="id"
          />
          <Modal
            title="新增任务"
            open={modalVisable}
            confirmLoading={confirmLoading}
            keyboard={false}
            maskClosable={false}
            onCancel={this.cancel}
            onOk={this.submit}
          >
            <Form
              ref={(x) => (this.formInstance = x)}
              initialValues={{
                task: '',
                time: '',
              }}
              layout="vertical"
            >
              <Form.Item
                label="任务描述"
                name="task"
                validateTrigger="onBlur"
                rules={[
                  { required: true, message: 'task is required' },
                  { min: 6, message: 'minmum 6 characters' },
                ]}
              >
                <Input.TextArea rows={4}></Input.TextArea>
              </Form.Item>
              <Form.Item
                label="预期完成时间"
                name="time"
                validateTrigger="onBlur"
                rules={[{ required: true, message: 'this time is required' }]}
              >
                <DatePicker showTime />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.queryData();
  }
}

export default Task;
