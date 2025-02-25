import React from "react";
import { transformName } from "../config/helpers";
import styles from "../assets/styles/profileStyles";
import { View } from "react-native";
import { Avatar, Button, Overlay, Text } from "react-native-elements";

function DoctorDetails({ selectedDoctor, closeModal }) {
  if (selectedDoctor) {
    return (
      <Overlay isVisible={selectedDoctor !== null} fullScreen>
        <View style={styles.container}>
          <View style={styles.userMetaContainer}>
            <Avatar
              size={40}
              rounded
              title={transformName(selectedDoctor.name)}
              containerStyle={{ backgroundColor: "#3d4db7" }}
            />
            <View style={styles.userMeta}>
              <Text>{selectedDoctor.name}</Text>
              <Text>{selectedDoctor.email}</Text>
            </View>
          </View>
          <View style={styles.doctorInfo}>
            <View style={styles.infoCell}>
              <Text style={styles.infoTitle}>الاختصاص</Text>
              <Text style={styles.infoText}>
                {selectedDoctor.profile.specialization}
              </Text>
            </View>
            <View style={styles.infoCell}>
              <Text style={styles.infoTitle}>العنوان</Text>
              <Text style={styles.infoText}>
                {selectedDoctor.profile.address}
              </Text>
            </View>
            <View style={styles.infoCell}>
              <Text style={styles.infoTitle}>ساعات العمل</Text>
              <Text style={styles.infoText}>
                {selectedDoctor.profile.workingHours}
              </Text>
            </View>
            <View style={styles.lastCell}>
              <Text style={styles.infoTitle}>رقم الهاتف</Text>
              <Text style={styles.infoText}>
                {selectedDoctor.profile.phone}
              </Text>
            </View>
          </View>

          <Button
            title="عودة"
            style={{ marginTop: "50px" }}
            onPress={closeModal}
          />
        </View>
      </Overlay>
    );
  }
}

export default DoctorDetails;
