import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Field, reduxForm } from 'redux-form'
import "../App.less";
import {
  Affix,
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

import Nav from '../component/Nav'
import Header from "../component/Header";
import FooterDash from '../component/Footer';

const { Content } = Layout;
const { Title } = Typography;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 }
  }
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 14,
      offset: 6
    }
  }
};

const makeField = Component => ({ input, meta, children, hasFeedback, label, ...rest }) => {
  const hasError = meta.touched && meta.invalid;
  return (
    <FormItem
      {...formItemLayout}
      label={label}
      validateStatus={hasError ? "error" : "success"}
      hasFeedback={hasFeedback && hasError}
      help={hasError && meta.error}
    >
      <Component {...input} {...rest} children={children} />
    </FormItem>
  );
};
const AInput = makeField(Input);
const ARadioGroup = makeField(RadioGroup);
const AAvatar = makeField(Avatar)

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
  
const Profil = (props) => {

const userData = useSelector((state) => state.userData);
const dispatch = useDispatch();

console.log(userData);

const { handleSubmit, pristine, submitting } = props


const [componentSize, setComponentSize] = useState('default');
const [value, setValue] = React.useState(1);
// UpdateProfil Ambulance
const [nomEntreprise, setEntreprise] = useState("");
  const [siret, setSiret] = useState("");
  const [occupation, setOccupation] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [adresse, setAdresse] = useState("");
  const [postalCode, setCodePostal] = useState("");
  const [city, setCity] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {

    async function LoadInfoUser() {
      var request = await fetch("users/update-profil-ambulance");
      let response = await request.json();
      console.log(response.userProfil);

  }
  LoadInfoUser()


}, []);
  

  async function UpdateSoigant() {
      var request = await fetch("users/update-profil-ambulance", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `lastname=${lastname}&firstname=${firstname}&email=${email}&phone=${phone}&password=${password}&adresse=${adresse}&postalCode=${postalCode}&city=${city}&avatar=${avatar}`,
      });
      let response = await request.json();
      console.log(response);
      if (response.result == true) {
        successUpdate();
      } else {
        errorUpdate();
      }
  }

  const successUpdate = () => {
      message.success({
        content: "Votre profil a été mis à jour avec succès",
        className: "custom-class",
        style: {
          marginTop: "20vh",
        },
      });
  };
    
  const errorUpdate = () => {
    message.error({
      content: "Oups petite erreur, votre profil n'a pas pu être mis à jour.",
      className: "custom-class",
      style: {
        marginTop: "20vh",
      },
    });
  };

  const onChange = e => {
      console.log('radio checked', e.target.value);
      setValue(e.target.value);
  };

  const getInitialValues = () => {
    return {
      firstname: userData.firstname,
      lastname: userData.lastname,
    };
  }
    // if (userData.role == "ambulance") {
      return(
        <Layout>
          <Affix>
            <Nav />
          </Affix>
        <Layout>
          <Header />
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
            onSubmit={handleSubmit}
            initialValues={getInitialValues()}
            layout="vertical"
        >
           <Row gutter={[8, 8]}>
          <Col md={8} xs={24} >
                      <Field
                      component={AInput}
                      label="Nom de l’entreprise" 
                      name="nomEntreprise"
                      defaultValue='email'
                      style={styleInput}
                      hasFeedback/>

                      <Field 
                      label="SIRET"
                      component={AInput}
                      name="siret"
                      defaultValue='email'
                      style={styleInput}
                      />

                      <Field 
                      label="Email"
                      component={AInput}
                      name="email"
                      defaultValue='email'
                      style={styleInput}
                      />

                      <Field 
                      label="Téléphone"
                      component={AInput}
                      name="phone"
                      defaultValue='email'
                      style={styleInput}
                      />
            </Col>
            <Col md={8} xs={24} >

                      <Field 
                      label="Adresse"
                      component={AInput}
                      name="adresse"
                      defaultValue='email'
                      style={styleInput}
                      />

                      <Field 
                      label="Code Postal"
                      component={AInput}
                      name="postalCode"
                      defaultValue='email'
                      style={styleInput}
                      />

                      <Field 
                      label="Ville"
                      component={AInput}
                      name="city"
                      defaultValue='email'
                      style={styleInput}
                      />
              </Col>
              <Col md={8} xs={24} >
                     
                      <Field component={AAvatar}>
                      {UploadAvatar()}
                      </Field>

                      <Field 
                      label="Prénom"
                      component={AInput}
                      name="fistname"
                      defaultValue='email'
                      style={styleInput}
                      />

                      <Field 
                      label="Nom"
                      component={AInput}
                      name="lastname"
                      defaultValue='email'
                      style={styleInput}
                      />

                      <Field 
                      label="Poste"
                      component={AInput}
                      name="occupation"
                      defaultValue='email'
                      style={styleInput}
                      />

                      <Field 
                        label="Changer mot de passe"
                        name="password"
                        placeholder="input password" 
                        component={AInput}
                        style={styleInput} 
                        defaultValue='email'
                      />

                      <FormItem {...tailFormItemLayout}>
                          <Button type="primary" disabled={pristine || submitting} htmlType="submit" style={{
                            fontSize: "17px",
                            height: "40px",
                            borderRadius: "10px",
                          }}
                          type="primary">
                          Valider
                          </Button>
                       </FormItem>
                       </Col>
                       </Row>
          </Form>
        
      </Content>
      <FooterDash />
        </Layout>
      </Layout>
      )

    // } else if (userData.role == "soignant"){
    //   return (
    //     <Layout>
    //     {/* <Affix>
    //       <Nav />
    //     </Affix> */}

    //     <Layout>
    //       <Header />
    //     <Content
    //       className="site-layout-background"
    //       style={{
    //         margin: '24px 16px',
    //         padding: 24,
    //         minHeight: 280,
    //     }}
    //     >
    //     <Title level={1}>Gestion du profil de votre entreprise</Title>

    //     <Form
    //         labelCol={{
    //           span: 12,
    //         }}
    //         wrapperCol={{
    //           span: 22,
    //         }}
    //         layout="vertical"
            
    //       >
    //         <Row gutter={[8, 8]}>
    //               <Col md={8} xs={24}>
    //                   <Field 
    //                   label="Nom"
    //                   name="lastname">
    //                       <Input style={styleInput}
    //                       onChange={(e) => setEntreprise(e.target.value)}
    //                       />
    //                   </Field>
    //                   <Field 
    //                   label="Prénom"
    //                   name="firstname">
    //                       <Input style={styleInput}
    //                       onChange={(e) => setSiret(e.target.value)}

    //                       />
    //                   </Field>
    //                   <Field 
    //                   label="Email"
    //                   name="email">
    //                       <Input style={styleInput}
    //                       onChange={(e) => setEmail(e.target.value)}
    //                       />
    //                   </Field>
    //                   <Field 
    //                   label="Téléphone"
    //                   name="phone">
    //                       <Input style={styleInput}
    //                       onChange={(e) => setPhone(e.target.value)}

    //                       />
    //                   </Field>
    //               </Col>
    //               <Col md={8} xs={24} >
    //                   <Field name='adresse' label="Adresse" >
    //                     <Input.TextArea 
    //                     showCount 
    //                     maxLength={100} 
    //                     onChange={(e) => setAdresse(e.target.value)}
    //                     rows={5} style={styleInput}/>
    //                   </Field>
    //                   <Field label="Code Postal">
    //                       <Input style={styleInput}
    //                       onChange={(e) => setCodePostal(e.target.value)}/>
    //                   </Field >
    //                   <Field label="Ville">
    //                       <Input style={styleInput}
    //                       onChange={(e) => setCity(e.target.value)}/>
    //                   </Field>

    //               </Col>
    //               <Col md={8} xs={24} >
    //                   <Radio.Group onChange={onChange} value={value}>
    //                       <Radio value={1}>Femme</Radio>
    //                       <Radio value={2}>Homme</Radio>
    //                   </Radio.Group>
    //                   <Field>
    //                   {UploadAvatar()}
    //                   </Field>
    //                   <Field 
    //                   label="Nom" 
    //                   name="username">
    //                       <Input style={styleInput}
    //                       onChange={(e) => setLastname(e.target.value)}/>
    //                   </Field>
    //                   <Field 
    //                   label="Prénom" 
    //                   name="username">
    //                       <Input style={styleInput}
    //                       onChange={(e) => setFirstname(e.target.value)}/>
    //                   </Field>
    //                   <Field 
    //                   label="Poste" 
    //                   name="occupation">
    //                       <Input style={styleInput}
    //                       onChange={(e) => setOccupation(e.target.value)}/>
    //                   </Field>
    //                   <Field 
    //                   label="Changer mot de passe"
    //                   name="password">
    //                     <Input.Password 
    //                     placeholder="input password" 
    //                     style={styleInput} 
    //                     onChange={(e) => setPassword(e.target.value)}/>
    //                   </Field>

    //                   <Button
    //                       onClick={() => UpdateAmbulance()}
    //                       block
    //                       style={{
    //                         fontSize: "17px",
    //                         height: "40px",
    //                         borderRadius: "10px",
    //                       }}
    //                       type="primary"
    //                     >
    //                       Valider
    //                   </Button>
    //               </Col>
    //         </Row>
    //       </Form>
        
    //   </Content>
    //   <FooterDash />
    //     </Layout>
    //   </Layout>
    //   )
    // }
}

export default reduxForm({
  form: 'EditProfil'  // a unique identifier for this form
})(Profil)

// InitializeFromStateForm = connect(
//   state => ({
//     initialValues: state.account.data // pull initial values from account reducer
//   }),
//   { load: loadAccount }               // bind account loading action creator
// )(InitializeFromStateForm)

  const styleInput = {
    fontSize: "15px",
    color: "#B170FF",
    borderRadius: "2rem",
  };

