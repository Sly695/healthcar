import React, {useState} from 'react';
import "../App.css";
import {
  Form,
  Input,
  Button,
  Radio,
  Layout,
  Typography,
  Row,
  Col,
  Avatar,
  Upload,
  message,
} from 'antd';
import { LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title } = Typography;
const { TextArea } = Input;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

function UploadAvatar() {
  
  const[loading, setloading] = useState(false)
  const[imageUrl, setImageUrl] = useState()

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setloading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        setloading(false),
        setImageUrl(),
      );
    }
  };

    const uploadButton = () => (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={handleChange}
        
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    );
  }


  export default function Profil(props) {

    const [componentSize, setComponentSize] = useState('default');
    const [value, setValue] = React.useState(1);

    const []

    const onChange = e => {
      console.log('radio checked', e.target.value);
      setValue(e.target.value);
    };

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

    return(
      <Content
        className="site-layout-background"
        style={{
          margin: '24px 16px',
          padding: 24,
          minHeight: 280,
      }}
      >
      <Title level={1}>Gestion du profil de votre entreprise</Title>

       <Form
          labelCol={{
            span: 12,
          }}
          wrapperCol={{
            span: 22,
          }}
          layout="vertical"
          initialValues={{
            size: componentSize,
          }}
          onValuesChange={onFormLayoutChange}
          size={componentSize}
        >
          <Row gutter={[8, 8]}>
                <Col span={8}>
                    <Form.Item 
                    label="Nom de l’entreprise"
                    name="entreprise">
                        <Input style={styleInput}/>
                    </Form.Item>
                    <Form.Item 
                    label="SIRET"
                    name="siret">
                        <Input style={styleInput}/>
                    </Form.Item>
                    <Form.Item 
                    label="Email"
                    name="email">
                        <Input style={styleInput}/>
                    </Form.Item>
                    <Form.Item 
                    label="Téléphone"
                    name="phone">
                        <Input style={styleInput}/>
                    </Form.Item>
                </Col>
                <Col span={8} >
                    <Form.Item name={['user', 'introduction']} label="Adresse siège social" >
                       <Input.TextArea showCount maxLength={100} onChange={onChange} rows={5} style={styleInput}/>
                    </Form.Item>
                    <Form.Item label="Code Postal">
                        <Input style={styleInput}/>
                    </Form.Item >
                    <Form.Item label="Ville">
                        <Input style={styleInput}/>
                    </Form.Item>

                </Col>
                <Col span={8} >
                    <Radio.Group onChange={onChange} value={value}>
                        <Radio value={1}>Femme</Radio>
                        <Radio value={2}>Homme</Radio>
                    </Radio.Group>
                    <Form.Item>
                    {UploadAvatar()}
                    </Form.Item>
                    <Form.Item 
                    label="Nom contact" 
                    name="username">
                        <Input style={styleInput}/>
                    </Form.Item>
                    <Form.Item 
                    label="Poste" 
                    name="occupation">
                        <Input style={styleInput}/>
                    </Form.Item>
                    <Form.Item 
                    label="Changer mot de passe"
                    name="password">
                      <Input.Password placeholder="input password" style={styleInput} />
                    </Form.Item>

                    <Button
                        block
                        style={{
                          fontSize: "17px",
                          height: "40px",
                          borderRadius: "10px",
                        }}
                        type="primary"
                      >
                        Valider
                    </Button>
                </Col>
          </Row>
        </Form>
      
    </Content>
    )

  }

  const styleInput = {
    fontSize: "15px",
    color: "#B170FF",
    borderRadius: "2rem",
  };

