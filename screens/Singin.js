import { ScrollView, KeyboardAvoidingView, View } from "react-native-web";
import styles from "../assets/styles/authStyles";
import { Formik } from "formik";
import * as yup from "yup";
import { Button, Input, Icon, Text } from "react-native-elements";
import { useState } from "react";
import Loader from "../components/Loader";
import Alert from "../components/Alert";
import axios from "../config/axios";
import { SINGIN_URI } from "../config/urls";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SinginScreen(props) {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [alert, setAlert] = useState({
    title: "",
    message: "",
    type: "",
  });

  const singinValidationSchema = yup.object().shape({
    email: yup.string().required(" يجب عليك ادخال الاسم البريد الالكنروني"),

    password: yup.string().required("يجب عليك ادخال كلمة المرور الصحيحة"),
  });

  const _singIn = async (values) => {
    setLoading(true);

    const body = {
      email: values.email,
      password: values.password,
    };
    try {
      const response = await axios.post(SINGIN_URI, body);
      AsyncStorage.setItem("accessToken", response.data.accessToken);

      console.log(response);
      setLoading(false);
      props.navigation.navigate("Home");
    } catch (e) {
      console.log(e);
      setLoading(false);
      setAlert({
        title: "تنبيه",
        message: e.response.data.message,
        type: "alert",
      });
      setVisible(true);
    }
  };
  return (
    <ScrollView>
      <Loader title="تسجيل الدخول" loading={loading} />
      <Alert
        visible={visible}
        title={alert.title}
        message={alert.message}
        type={alert.type}
        onClose={() => setVisible(false)}
      />
      <View style={styles.container}>
        <Icon raised name="user" type="font-awesome" color="#f50" size={50} />
        <Text h4>تسجيل دخول</Text>
      </View>
      <KeyboardAvoidingView behavior="padding" enapled>
        <View style={styles.container}>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={singinValidationSchema}
            onSubmit={(values) => _singIn(values)}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              errors,
              values,
              isValid,
            }) => (
              <>
                <Input
                  name="email"
                  placeholder="البريد الالكتروني"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  keyboredType="email-address"
                  style={[styles.textInput, errors.email && styles.errorInput]}
                />
                {errors.email && (
                  <Text p style={styles.textError}>
                    {errors.email}
                  </Text>
                )}
                <Input
                  name="password"
                  placeholder="كلمة المرور"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  secureTextEntry
                  style={[
                    styles.textInput,
                    errors.password && styles.errorInput,
                  ]}
                />
                {errors.password && (
                  <Text p style={styles.textError}>
                    {errors.password}
                  </Text>
                )}
                <Button
                  title="تسجيل الدخول"
                  style={{ marginTop: "20px" }}
                  onPress={handleSubmit}
                  disabled={!isValid}
                />
              </>
            )}
          </Formik>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
