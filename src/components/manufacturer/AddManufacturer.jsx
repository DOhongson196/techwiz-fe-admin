import { Button, Col, Divider, Form, Image, Input, Modal, Row, Upload } from 'antd';
import { useEffect, useState } from 'react';
import { API_MANUFACTURER, getManufacturerLogoUrl } from '../../services/constant';
import { ExclamationCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import useAxios from '../../utils/useAxios';

function AddManufacturers() {
  const [error, setError] = useState('');
  const [preview, setPreview] = useState('');
  const navigate = useNavigate();
  const manufacturerId = useParams();
  const [form] = Form.useForm();
  const api = useAxios();

  useEffect(() => {
    if (manufacturerId.id) {
      const fectchApi = async () => {
        try {
          const response = await api.get(API_MANUFACTURER + '/' + manufacturerId.id);
          form.setFieldsValue({
            id: response.data.id,
            name: response.data.name,
            logoFile: null,
          });
          setPreview(response.data.logo);
        } catch (error) {
          console.log(error);
        }
      };

      fectchApi();
    }
  }, []);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    if (e.fileList.length > 1) {
      return [e.fileList[0]];
    }

    return e && e.fileList;
  };

  const onSubmitForm = (value) => {
    let formData = new FormData();
    console.log(value);

    formData.append('name', value.name);
    if (value.logoFile !== null) {
      if (value.logoFile[0].originFileObj) {
        formData.append('logoFile', value.logoFile[0].originFileObj);
      }
    }
    if (!manufacturerId.id) {
      api
        .post(API_MANUFACTURER, formData)
        .then(() => {
          form.setFieldsValue({
            name: '',
          });
          Modal.confirm({
            icon: <ExclamationCircleOutlined />,
            title: 'OK',
            content: 'Add Manufacturer success',
            onOk: () => navigate('/manufacturers/list'),
            cancelText: 'Continue Add Manufacturer?',
            okText: 'List Manufacturers',
          });
        })
        .catch((res) => {
          if (res.response?.status === 403) {
            setError('You are not admin, you do not have permission!');
          } else {
            setError(res.response.data.message);
          }
        });
    } else {
      api
        .patch(API_MANUFACTURER + '/' + manufacturerId.id, formData)
        .then((res) => {
          console.log(res);
          Modal.success({
            title: 'OK',
            content: 'Edit Manufacturer success',
            onOk: () => navigate('/manufacturers/list'),
            okText: 'List Manufacturers',
          });
        })
        .catch((res) => {
          if (res.response?.status === 403) {
            setError('You are not admin, you do not have permission!');
          } else {
            setError(res.response.data.message);
          }
        });
    }
  };
  return (
    <div>
      <h1>{manufacturerId.id ? 'Update Manufacturer' : 'Add Manufacturer'}</h1>
      <Divider></Divider>
      <Form form={form} layout="vertical" className="form" onFinish={onSubmitForm} key={manufacturerId.id}>
        <Row>
          <Col md={6}>
            {manufacturerId.id && (
              <Form.Item label="Manufacturer ID" name="id">
                <Input readOnly />
              </Form.Item>
            )}
            <Form.Item label="Name" name="name" rules={[{ required: true, min: 2 }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="logoFile"
              label="Logo"
              rules={[{ required: manufacturerId.id ? false : true }]}
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload listType="picture" accept=".jpg,.png,.gif" maxCount={1} beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
            {manufacturerId.id && <h3>Prelogo</h3>}
            {preview != '' && <Image src={getManufacturerLogoUrl(preview)} style={{ width: 100 }}></Image>}
            <span style={{ color: 'red' }}>{error}</span>
            <Divider></Divider>
            <Button htmlType="submit" type="primary" style={{ float: 'right' }}>
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default AddManufacturers;
