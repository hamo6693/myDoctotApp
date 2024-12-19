import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { KeyboardAvoidingView, ScrollView } from "react-native-web";
import styles from "../assets/styles/authStyles";
import ProfileFile from "../components/ProfileForm";
import axios from "../config/axios";
import { REGISTER_URI } from "../config/urls";
import * as Loacation from "expo-location";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Alert from "../components/Alert";

export default function SingUpScreen(props) {
  const { navigation } = props;

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const [alert, setAlert] = useState({
    title: "",
    msg: "",
    type: "",
  });

  useEffect(() => {
    (async () => {
      let { status } = await Loacation.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Loacation.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const _singUp = async (values) => {
    setLoading(true);

    const body = {
      name: values.name,
      email: values.email,
      password: values.password,
      userType: values.userType ? "doctor" : "normal",
      specialization: values.specialization,
      address: values.address,
      workingHours: values.workingHours,
      phone: values.phone,
      
    };
    try {
      const response = await axios.post(REGISTER_URI, body);
      setLoading(false)
      setAlert({
        title: "تسجيل ناجح",
        message: "لقد قمت بتسجيل الدخول هل تريد الانتقال الى الصفحة الرئيسية",
        type: "question",
      });
      setVisible(true);
      console.log(response);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
      setVisible(true);

      setAlert({
        title: "تنبيه",
        message: e.response.data.errors[0].message,
        type: "alert",
      });
    }
  };

  return (
    <ScrollView>
      <Loader title="جاري انشاء حساب" loading={loading} />
      <Alert
        visible={visible}
        title={alert.title}
        message={alert.message}
        type={alert.type}
        onClose={() => setVisible(false)}
        onClick={() =>{
            setVisible(false)
        navigation.navigate("Singin")}

        }
      />
      <View style={styles.container}>
        <Icon raised name="user" type="font-awesome" color="#f50" size={50} />
        <Text h4>تسجيل حساب جديد</Text>
      </View>
      <KeyboardAvoidingView behavior="padding" enapled>
        <ProfileFile submit={(values) => _singUp(values)} user={null} disapled={false} buttonTittle="تسجيل حساب جديد" checkBox={true} />
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
