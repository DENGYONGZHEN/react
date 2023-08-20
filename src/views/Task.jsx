import React, { useState, useEffect } from 'react';
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

const Task = function Task() {
  const [selectValue, setSelectValue] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [modalVisable, setModalVisable] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  let [formInstance] = Form.useForm();

  useEffect(() => {
    queryData();
  }, [selectValue]);

  /**
   * 请求服务器的数据
   */
  const queryData = async () => {
    try {
      //开启加载显示
      setTableLoading(true);
      //发起请求
      let { code, list } = await getTaskList(selectValue);
      if (+code !== 0) list = [];
      setTableData(list);
    } catch (_) {}
    setTableLoading(false);
  };

  const closeModal = () => {
    setModalVisable(false);
    setConfirmLoading(false);
    formInstance.resetFields();
  };

  const submit = async () => {
    try {
      //表单校验
      await formInstance.validateFields();
      //收集表单数据
      let { task, time } = formInstance.getFieldsValue();
      time = time.format('YYYY-MM-DD HH:mm:ss');
      //开启显示加载状态
      setConfirmLoading(true);
      //发送请求
      let { code } = await postTask(task, time);
      if (+code !== 0) {
        message.error('sorry,submit failed!');
        setConfirmLoading(false);
      } else {
        message.success('submit success');
        closeModal();
        queryData();
      }
    } catch (error) {
      message.error('表单验证失败');
    }
  };

  //删除一条数据记录
  const deleteData = async (id) => {
    try {
      setTableLoading(true);
      let { code } = await deleteTask(id);
      if (+code !== 0) {
        message.error('delete failed!');
      } else {
        queryData();
        message.success('delete success');
      }
    } catch (_) {}
    setTableLoading(false);
  };
  //完成task
  const completeTask = async (id) => {
    try {
      setTableLoading(true);
      let { code } = await patchTaskList(id);
      if (+code !== 0) {
        message.error('update failed!');
      } else {
        queryData();
        message.success('update success');
      }
    } catch (_) {}
    setTableLoading(false);
  };
  /**
   * dataIndex  对应一条数据记录中的字段
   * title      表格头部的列名
   *
   * render 处理需要渲染的数据，有多少行数据，render就会渲染多少次
   * render: (text, record) => {}  text 当前这一行这一列单元格存储的内容
   *  record  这一行记录的数据
   */
  const colums = [
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
              onConfirm={deleteData.bind(null, id)}
            >
              <Button type="link">删除</Button>
            </Popconfirm>
            {+state !== 2 ? (
              <Popconfirm
                title="确定完成此任务吗"
                onConfirm={completeTask.bind(null, id)}
              >
                <Button type="link">完成</Button>
              </Popconfirm>
            ) : null}
          </>
        );
      },
    },
  ];

  return (
    <div className="task-box">
      <div className="header">
        <h2 className="title">任务管理系统</h2>
        <Button
          type="primary"
          onClick={() => {
            setModalVisable(true);
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
              onClick={() => {
                setSelectValue(index);
              }}
            >
              {item}
            </Tag>
          );
        })}
      </div>

      <div className="list">
        <Table
          dataSource={tableData}
          columns={colums}
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
          onCancel={closeModal}
          onOk={submit}
        >
          <Form
            form={formInstance}
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
};

export default Task;
