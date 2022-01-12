import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { Form, Button, PageHeader, Typography, Table, Tag } from "antd";
import { SmileOutlined } from "@ant-design/icons/lib/icons";
import { Content } from "antd/lib/layout/layout";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function View() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState();

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
  ];

  useEffect(() => {
    const profile = localStorage.getItem("profile");
    if (!profile) {
      navigate("/");
      return;
    }
    setProfile(JSON.parse(profile));
  }, []);

  return (
    <PageHeader
      className="site-page-header"
      title="View Profile"
      extra={[
        <Button type="primary" onClick={() => navigate("/edit-profile")}>
          Edit Profile
        </Button>,
      ]}
    >
      <Content>
        {profile && (
          <Formik>
            {(props) => (
              <Form.Provider>
                <Form name="basicForm">
                  <Form.Item label="First Name" name="firstName">
                    {profile.firstName}
                  </Form.Item>
                  <Form.Item label="Last Name" name="lastName">
                    {profile.lastName}
                  </Form.Item>
                  <Form.Item label="Email" name="email">
                    {profile.email}
                  </Form.Item>
                  <Form.Item label="Tagline" name="tagline">
                    {profile.tagline}
                  </Form.Item>
                  <Form.Item label="Skills" name="skills">
                    {profile.skills.map((skill) => (
                      <Tag>{skill}</Tag>
                    ))}
                  </Form.Item>
                  <Form.Item>
                    <div>Work experiences : </div>
                    {profile.experiences.length ? (
                      <Table
                        pagination={false}
                        columns={columns}
                        dataSource={profile.experiences}
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
                    )}
                  </Form.Item>
                </Form>
              </Form.Provider>
            )}
          </Formik>
        )}
      </Content>
    </PageHeader>
  );
}
export default View;
