import { Button, Col, Divider, Image, Modal, Pagination, Row, Space, Table } from 'antd';
import Column from 'antd/es/table/Column';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { API_MANUFACTURER, getManufacturerLogoUrl } from '../../services/Constant';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxios from '../../utils/useAxios';

function ListManufacturers() {
  const [manufacturers, setManufacturers] = useState([]);
  const [pagination, setPagination] = useState({
    size: 5,
    totalElements: 0,
    totalPages: 1,
  });
  const [page, setPage] = useState(0);
  const [render, setRender] = useState(false);
  const navigate = useNavigate();
  const api = useAxios();

  const onChange = (pageNumber, pageSize) => {
    console.log(pageNumber, pageSize);
    setPage(pageNumber - 1);
  };

  useEffect(() => {
    const fectchApi = async () => {
      try {
        const response = await api.get(API_MANUFACTURER + `/page?size=${pagination.size}&sort=id&page=${page}`);
        setManufacturers(response.data.content);
        setPagination({
          ...pagination,
          totalElements: response.data.totalElements,
          totalPages: response.data.totalPages,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fectchApi();
  }, [render || page]);

  const editCategory = (manufacturer) => {
    navigate('/manufacturer/update/' + manufacturer.id);
  };

  const deleteCategory = async (manufacturer) => {
    console.log(manufacturer);
    try {
      const response = await api.delete(API_MANUFACTURER + '/' + manufacturer.id);
      console.log(response);
      setRender(!render);
    } catch (error) {
      if (error.response?.status === 403) {
        Modal.error({
          title: 'Error',
          okText: 'OK',
          content: 'You are not admin, you do not have permission!',
        });
      } else {
        Modal.error({
          title: 'Error deleting',
          content: error?.response?.data?.message,
          okText: 'OK',
        });
      }
    }
  };

  const openDeleteConfirmModal = (manufacturer) => {
    const message = 'Are you sure delete manufacturer ' + manufacturer.name;

    Modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      onOk: () => deleteCategory(manufacturer),
      okText: 'Delete',
      cancelText: 'Cancel',
      content: message,
    });
  };

  return (
    <>
      <h1>List Manufacturers</h1>
      <Divider></Divider>

      <Row>
        <Col md={16}>
          <Table dataSource={manufacturers} size="smaill" rowKey="id" pagination={false}>
            <Column title="Category Id" key="id" dataIndex="id" width={120} align="center"></Column>
            <Column
              title="Logo"
              key="logo"
              dataIndex="logo"
              width={140}
              align="center"
              render={(_, record) => (
                <Space size="middle">
                  <Image width={80} height={80} src={getManufacturerLogoUrl(record.logo)}></Image>
                </Space>
              )}
            ></Column>
            <Column title="Name" key="name" dataIndex="name"></Column>
            <Column
              title="Action"
              key="action"
              align="center"
              width={240}
              render={(_, record) => (
                <Space size="middle">
                  <Button key={record.key} type="primary" size="small" onClick={() => editCategory(record)}>
                    <EditOutlined style={{ marginRight: 4 }} />
                    Edit
                  </Button>
                  <Button
                    key={record.key}
                    type="primary"
                    danger
                    size="small"
                    onClick={() => openDeleteConfirmModal(record)}
                  >
                    <DeleteOutlined style={{ marginRight: 4 }} />
                    Delete
                  </Button>
                </Space>
              )}
            ></Column>
          </Table>
          <Row style={{ marginTop: 12 }}>
            <Col md={24} style={{ textAlign: 'right' }}>
              <Pagination
                defaultCurrent={0}
                defaultPageSize={pagination.size}
                total={pagination.totalElements}
                onChange={onChange}
              ></Pagination>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default ListManufacturers;
