import React, { useEffect, useState } from "react";
import { Input, SubmitButton } from "formik-antd";
import { Formik } from "formik";
import {
  Form,
  Button,
  PageHeader,
  Select,
  Typography,
  Table,
  Popconfirm,
  message,
} from "antd";
import { PlusOutlined, SmileOutlined } from "@ant-design/icons/lib/icons";
import ModalForm from "../../component/ModalForm";
import { Content } from "antd/lib/layout/layout";
import moment from "moment";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const skills = [
  "Problem Solving Skills.",
  "Critical Thinking Skills.",
  "Flexibility.",
  "Communication Skills.",
  "Teamwork.",
  "Organization Skills.",
  "Creativity.",
  "Emotional Intelligence.",
];

const initialValues = {};

function Edit() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const columns = [
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Title or role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Start",
      dataIndex: "start",
      key: "start",
      render: (_, record) => moment(_).format("MMM YYYY"),
    },
    {
      title: "End",
      dataIndex: "end",
      key: "end",
      render: (_, record) => (_ ? moment(_).format("MMM YYYY") : "Present"),
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      fixed: "right",
      render: (_, record, index) => (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => handleDelete(index)}
        >
          <Button type="link">Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  useEffect(() => {
    const profile = localStorage.getItem("profile");
    if (!profile) {
      navigate("/");
      return;
    }
    form.setFieldsValue(JSON.parse(profile));
  }, []);

  const showUserModal = () => {
    setVisible(true);
  };

  const hideUserModal = () => {
    setVisible(false);
  };

  const submitForm = (values, actions) => {
    const profile = {
      ...form.getFieldsValue(),
      experiences: form.getFieldValue("experiences"),
    };
    localStorage.setItem("profile", JSON.stringify(profile, null, 2));
    // alert(JSON.stringify(profile, null, 2));
    actions.setSubmitting(false);
    message.success("Profile saved successfully");
    navigate("/view-profile");
  };

  const handleDelete = (index) => {
    const experiences = form.getFieldValue("experiences") || [];
    experiences.splice(index, 1);
    form.setFieldsValue({ experiences: [...experiences] });
  };

  return (
    <PageHeader className="site-page-header" title="Edit Profile">
      <Content>
        <Formik initialValues={initialValues} onSubmit={submitForm}>
          {(props) => (
            <Form.Provider
              onFormFinish={(name, { values, forms }) => {
                if (name === "experienceForm") {
                  const { basicForm } = forms;
                  const experiences =
                    basicForm.getFieldValue("experiences") || [];
                  basicForm.setFieldsValue({
                    experiences: [...experiences, values],
                  });
                  setVisible(false);
                }
              }}
            >
              <Form
                form={form}
                name="basicForm"
                layout="vertical"
                onFinish={props.handleSubmit}
              >
                <Form.Item
                  label="First Name"
                  name="firstName"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Please input your first name!",
                    },
                  ]}
                >
                  <Input name="firstName" placeholder="First Name" />
                </Form.Item>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  required
                  rules={[
                    { required: true, message: "Please input your last name!" },
                  ]}
                >
                  <Input name="lastName" placeholder="Last Name" />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  required
                  rules={[
                    { required: true, message: "Please input your email!" },
                    { type: "email", message: "Please input valid email!" },
                  ]}
                >
                  <Input name="email" placeholder="Email" />
                </Form.Item>
                <Form.Item
                  label="Tagline"
                  name="tagline"
                  required
                  rules={[
                    { required: true, message: "Please input your tagline!" },
                  ]}
                >
                  <Input name="tagline" placeholder="Tagline" />
                </Form.Item>
                <Form.Item
                  label="Skills"
                  name="skills"
                  required
                  rules={[
                    { required: true, message: "Please select your skills!" },
                  ]}
                >
                  <Select
                    mode="multiple"
                    allowClear
                    name="skills"
                    style={{ width: "100%" }}
                    placeholder="Skills"
                  >
                    {skills.map((skill) => (
                      <Option key={skill} value={skill}>
                        {skill}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Work experiences"
                  shouldUpdate={(prevValues, curValues) =>
                    prevValues.experiences !== curValues.experiences
                  }
                >
                  {({ getFieldValue }) => {
                    const experiences = getFieldValue("experiences") || [];
                    return experiences.length ? (
                      <Table
                        pagination={false}
                        columns={columns}
                        dataSource={experiences}
                        scroll={{ x: 500 }}
                        expandable={{
                          expandedRowRender: (record) => (
                            <p style={{ margin: 0 }}>{record.description}</p>
                          ),
                          rowExpandable: (record) =>
                            record.name !== "Not Expandable",
                        }}
                      />
                    ) : (
                      <Typography.Text
                        className="ant-form-text"
                        type="secondary"
                      >
                        ( <SmileOutlined /> No experience yet. )
                      </Typography.Text>
                    );
                  }}
                </Form.Item>
                <Form.Item>
                  <Button
                    htmlType="button"
                    type="dashed"
                    onClick={showUserModal}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Work Experiences
                  </Button>
                </Form.Item>
                <Form.Item>
                  <SubmitButton>Submit</SubmitButton>
                </Form.Item>
              </Form>
              <ModalForm visible={visible} onCancel={hideUserModal} />
            </Form.Provider>
          )}
        </Formik>
      </Content>
    </PageHeader>
  );
}
export default Edit;
