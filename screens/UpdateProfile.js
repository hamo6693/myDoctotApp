import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { KeyboardAvoidingView, ScrollView } from "react-native-web";
import styles from "../assets/styles/authStyles";
import ProfileFile from "../components/ProfileForm";
import axios from "../config/axios";
import { GET_PROFILE_URI, UPDATE_PROFILE_URL } from "../config/urls";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Alert from "../components/Alert";
import AsyncStorage from "@react-native-async-storage/async-storage";

function UpdateProfileScreen(props) {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({
    title: "",
    message: "",
    type: "",
  });

  const _getProfile = async () => {
    setLoading(true);

    try {
      const token = await AsyncStorage.getItem("accessToken");
      axios.defaults.headers.common.Authorization = `JWT ${token}`;
      const response = await axios.get(GET_PROFILE_URI);
      setUser(response.data);
      setLoading(false);
      console.log(response);
    } catch (e) {
      console.log(e);
      setLoading(false);
      console.log(response);
    }
  };

  useEffect(() => {
    _getProfile();
  }, []);

  const _updateProfile = async (values) => {
    setLoading(true);

    const body = {
      name: values.name,
      password: values.password,
      userType: values.userType ? "doctor" : "normal",
      specialization: values.specialization,
      address: values.address,
      phone: values.phone,
      workingHours: values.workingHours,
    };
    try {
      const response = await axios.put(UPDATE_PROFILE_URL, body);
      setLoading(false);
      setAlert({
        title: "تنبيه!",
        message: "تم تعديل حسابك بنجاح",
        type: "alert",
      });
      setVisible(true);
    } catch (e) {
      console.log(e);
      setLoading(false);
      setAlert({
        title: "خطأ!",
        message: e.response.data.errors[0],
        type: "alert",
      });
      setVisible(true);
    }
  };

  return (
    <ScrollView>
      <Loader loading={loading} />
      <Alert
        visible={visible}
        title={alert.title}
        message={alert.message}
        type={alert.type}
        onClose={() => {
          setVisible(false);
        }}
      />
      {user && (
        <>
          <View style={styles.container}>
            <Icon
              raised
              name="user"
              type="font-awesome"
              color="#f50"
              size={50}
            />
            <Text h4>تعديل بيانات المستخدم</Text>
          </View>
          <KeyboardAvoidingView behavior="padding" enabled>
            <View style={styles.container}>
              <ProfileFile
                user={user}
                submit={(values) => _updateProfile(values)}
                disabled={true}
                buttonTittle="تعديل البيانات"
                checkBox={false}
              />
            </View>
          </KeyboardAvoidingView>
        </>
      )}
    </ScrollView>
  );
}

export default UpdateProfileScreen;
