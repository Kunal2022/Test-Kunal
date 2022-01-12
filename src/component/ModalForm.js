import React, { useEffect, useRef, useState } from "react";
import { Form, Modal } from "antd";
import { Checkbox, DatePicker, Input } from "formik-antd";

const useResetFormOnCloseModal = ({ form, visible }) => {
  const prevVisibleRef = useRef();
  useEffect(() => {
    prevVisibleRef.current = visible;
  }, [visible]);
  const prevVisible = prevVisibleRef.current;
  useEffect(() => {
    if (!visible && prevVisible) {
      form.resetFields();
    }
  }, [visible]);
};

const ModalForm = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const [checkEnd, setCheckEnd] = useState(false);

  useEffect(() => {
    form.validateFields(["end"]);
  }, [checkEnd]);

  const onCheckboxChange = (e) => {
    setCheckEnd(e.target.checked);
  };

  useResetFormOnCloseModal({
    form,
    visible,
  });

  const onOk = () => {
    form.submit();
  };

  return (
    <Modal
      title="Work Experience"
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical" name="experienceForm">
        <Form.Item
          label="Company"
          name={"company"}
          rules={[
            {
              required: true,
              message: "Please input your company!",
            },
          ]}
        >
          <Input name="company" placeholder="Company" />
        </Form.Item>
        <Form.Item
          label="Title or role"
          name={"role"}
          rules={[
            {
              required: true,
              message: "Please input your title or role!",
            },
          ]}
        >
          <Input name="role" placeholder="Title or role" />
        </Form.Item>
        <Form.Item
          label="Start"
          name={"start"}
          rules={[
            {
              type: "object",
              required: true,
              message: "Please select start!",
            },
          ]}
        >
          <DatePicker picker="month" />
        </Form.Item>
        <Form.Item label="End" required>
          <Form.Item noStyle name={"end"}>
            <Checkbox name="end" checked={checkEnd} onChange={onCheckboxChange}>
              Present
            </Checkbox>
          </Form.Item>
          <Form.Item
            noStyle
            name={"end"}
            rules={[
              {
                type: "object",
                required: !checkEnd,
                message: "Please select end!",
              },
            ]}
          >
            <DatePicker picker="month" />
          </Form.Item>
        </Form.Item>
        <Form.Item
          label="Description"
          name={"description"}
          rules={[
            {
              required: true,
              message: "Please input your description!",
            },
            {
              max: 300,
              message: "Maximum 300 char",
            },
          ]}
        >
          <Input.TextArea
            showCount
            name="description"
            placeholder="Description"
            maxLength={300}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalForm;
