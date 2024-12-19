import { Formik } from "formik";
import * as yup from "yup";
import styles from "../assets/styles/authStyles";
import { Button,Input,CheckBox,Text } from "react-native-elements";

export default function ProfileFile(props) {
  const validationSchema = yup.object().shape({
    name: yup.string().required("يجب عليك ادخال الاسم"),

    email: yup.string().required(" يجب عليك ادخال الاسم البريد الالكنروني"),

    password: yup
      .string()
      .required("يجب عليك ادخال كلمة المرور")
      .min(5,"يجب ان نكون كلمة المرور اكثر من 5 محارف"),

    userType: yup.boolean(),

    specialization: yup.string().when("userType", {
      is: true,
      then: (schema) => schema.required("يحب عليك ادخال التخصص"),
    }),
    address: yup.string().when("userType", {
      is: true,
      then: (schema) => schema.required("يحب عليك ادخال العنوان"),
    }),

    workingHours: yup.string().when("userType", {
      is: true,
      then: (schema) => schema.required("يحب عليك ادخال ساعات العمل"),
    }),

    phone: yup.string().when("userType", {
      is: true,
      then: (schema) => schema.required("يحب عليك ادخال الهاتف"),
    }),
  });
  return (
    <Formik
      initialValues={{
        name:props.user?.name || "",
        email: props.user?.email || "",
        password: "",
        userType: props.user?.userType == "doctor",
        specialization: props.user?.profile?.specialization || "",
        address: props.user?.profile?.address || "",
        workingHours: props.user?.profile?.workingHours || "",
        phone: props.user?.profile?.phone || "",
       
      }}
      validationSchema={validationSchema}
      onSubmit={values => props.submit(values)}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        errors,
        values,
        setFieldValue,
        isVaild
      }) => (
        <>
          <Input
            name="name"
            placeholder="الاسم"
            value={values.name}
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
            style={[styles.textInput, errors.name && styles.errorInput]}
          />
          {errors.name && (
            <Text p style={styles.textError}>
              {errors.name}
            </Text>
          )}
          <Input
            name="email"
            placeholder="البريد الالكتروني"
            value={values.email}
            disabled={props.disabled}

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
            style={[styles.textInput, errors.password && styles.errorInput]}
          />
          {errors.password && (
            <Text p style={styles.textError}>
              {errors.password}
            </Text>
          )}
          {
            props.checkBox &&
            <CheckBox
            checked={values.userType}
            title="انا طبيب"
            name="userType"
            onPress={() => setFieldValue("userType", !values.userType)}
          />
          }
          

          {values.userType && (
            <>
              <Input
                name="specialization"
                placeholder="التخصص"
                onChangeText={handleChange("specialization")}
                onBlur={handleBlur("specialization")}
                style={[
                  styles.textInput,
                  errors.specialization && styles.errorInput,
                ]}
              />
              {errors.specialization && (
                <Text p style={styles.textError}>
                  {errors.specialization}
                </Text>
              )}

              <Input
                name="address"
                placeholder=" العنوان"
                onChangeText={handleChange("address")}
                onBlur={handleBlur("address")}
                style={[styles.textInput, errors.address && styles.errorInput]}
              />
              {errors.address && (
                <Text p style={styles.textError}>
                  {errors.address}
                </Text>
              )}

              <Input
                name="workingHours"
                placeholder="ساعات العمل"
                onChangeText={handleChange("workingHours")}
                onBlur={handleBlur("workingHours")}
                style={[
                  styles.textInput,
                  errors.workingHours && styles.errorInput,
                ]}
              />
              {errors.workingHours && (
                <Text p style={styles.textError}>
                  {errors.workingHours}
                </Text>
              )}

              <Input
                name="phone"
                placeholder="رقم الهاتف"
                onChangeText={handleChange("phone")}
                onBlur={handleBlur("phone")}
                style={[styles.textInput, errors.phone && styles.errorInput]}
              />
              {errors.phone && (
                <Text p style={styles.textError}>
                  {errors.phone}
                </Text>
              )}
            </>
          )}
          <Button title={props.buttonTittle} style={{marginTop:"20px"}} onPress={handleSubmit} disabled={isVaild}/>

        </>
      )
      }
    </Formik>
  );
}
