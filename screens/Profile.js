import { ScrollView, View } from "react-native";
import Alert from "../components/Alert";
import { useEffect, useState } from "react";
import styles from "../assets/styles/profileStyles";
import Loader from "../components/Loader";
import axios from "../config/axios";
import { DELETE_PROFILE_URI, GET_PROFILE_URI } from "../config/urls";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { transformName } from "../config/helpers";
import { Button, Icon, Text } from "react-native-elements";

export default function ProfileScreen(props) {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState("");
  const [alert, setAlert] = useState({
    title: "",
    message: "",
    type: "",
  });

  useEffect(() => {
    _getProfile();
  }, []);
  const _getProfile = async (req, res) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("accessToken");
      axios.defaults.headers.common.Authorization = `JWT ${token}`;

      const response = await axios.get(GET_PROFILE_URI);
      console.log(response);
      setUser(response.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const hanlerAction = async () => {
    try{
        if(alert.type ==="delete") {
            const token = await AsyncStorage.getItem("accessToken")
            axios.defaults.headers.common.Authorization = `JWT ${token}`
            const response = await axios.delete(DELETE_PROFILE_URI)
            console.log(response);
            
        }
        await AsyncStorage.clear()
        props.navigation.navigate("Home")
    }catch(e) {
        console.log(e);
        
    }
  }

  const showAlert = (title,message,type) => {
    setAlert({
        title:title,
        message:message,
        type:type
    })
    setVisible(true)
  }

  const confirm = (type) => {
    showAlert(
        type === "delete"? "انت على وشك حذف الحساب":"انت على وشك تسجيل الخروج",
        type === "delete"? " انت على وشك حذف الحساب بالفعل":"انت على وشك تسجيل الخروج بالفعل",
        type
    )
  }

  const handleConfirm =async () => {
    setVisible(false)
    await hanlerAction()
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Loader loading={loading} />
        <Alert
        visible={visible}
        title={alert.title}
        message={alert.message}
        type={alert.type}
        onClick={handleConfirm}
        onClose={() => setVisible(false)}

      />

        {user && (
          <View>
            <View style={styles.userIconContainer}>
              <View style={styles.userMetaContainer}>
                <View style={styles.userAvtar}>
                  <Text style={styles.userAvtarText}>
                    {transformName(user.name)}
                  </Text>
                </View>
                <View style={styles.userMeta}>
                  <Text>{user.name}</Text>
                  <Text>{user.email}</Text>
                </View>
              </View>
              <View style={styles.iconsConatiner}>
                <Icon
                  name="edit"
                  type="font-awesome"
                  color="#f50"
                  style={{ marginLeft: "5px" }}
                  onPress={() => props.navigation.navigate("UpdateProfile")}
                />
                <Icon
                  name="trash"
                  type="font-awesome"
                  color="#f50"
                  onPress={() => confirm("delete")}
                />
              </View>
            </View>
            {user.profile && (
              <View style={{ marginBottom: "50px" }}>
                <View style={styles.doctorInfo}>
                  <View style={styles.infoCell}>
                    <Text style={styles.infoTitle}>الاختصاص</Text>
                    <Text style={styles.infoText}>
                      {user.profile.specialization}
                    </Text>
                  </View>
                  <View style={styles.infoCell}>
                    <Text style={styles.infoTitle}>العنوان</Text>
                    <Text style={styles.infoText}>{user.profile.address}</Text>
                  </View>
                  <View style={styles.infoCell}>
                    <Text style={styles.infoTitle}>ساعات العمل</Text>
                    <Text style={styles.infoText}>
                      {user.profile.workingHours}
                    </Text>
                  </View>
                  <View style={styles.lastCell}>
                    <Text style={styles.infoTitle}>رقم الهاتف</Text>
                    <Text style={styles.infoText}>{user.profile.phone}</Text>
                  </View>
                </View>
              </View>
            )}
            <Button
              buttonStyle={styles.logoutButton}
              title="تسجيل الخروج"
              onPress={() => confirm("logout")}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
}
