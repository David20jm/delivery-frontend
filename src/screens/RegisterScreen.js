import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { Formik } from "formik";
import * as Yup from "yup";

const RegisterScreen = ({ navigation }) => {
  const { register } = useContext(AuthContext);
  const [errorGeneral, setErrorGeneral] = useState(null);

  // Validaciones con Yup
  const RegisterSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, "Mínimo 3 caracteres")
      .required("El nombre es obligatorio"),
    correo: Yup.string()
      .email("Correo inválido")
      .required("El correo es obligatorio"),
    password: Yup.string()
      .min(6, "Mínimo 6 caracteres")
      .required("La contraseña es obligatoria"),
    confirmarPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden")
      .required("Debes confirmar la contraseña"),
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Cuenta</Text>

      <Formik
        initialValues={{ nombre: "", correo: "", password: "", confirmarPassword: "" }}
        validationSchema={RegisterSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setErrorGeneral(null);
          try {
            await register(values.nombre, values.correo, values.password);
          } catch (err) {
            setErrorGeneral("Error al registrar. Intenta de nuevo.");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={values.nombre}
              onChangeText={handleChange("nombre")}
              onBlur={handleBlur("nombre")}
            />
            {touched.nombre && errors.nombre && <Text style={styles.error}>{errors.nombre}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Correo"
              value={values.correo}
              onChangeText={handleChange("correo")}
              onBlur={handleBlur("correo")}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {touched.correo && errors.correo && <Text style={styles.error}>{errors.correo}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              secureTextEntry
            />
            {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Confirmar Contraseña"
              value={values.confirmarPassword}
              onChangeText={handleChange("confirmarPassword")}
              onBlur={handleBlur("confirmarPassword")}
              secureTextEntry
            />
            {touched.confirmarPassword && errors.confirmarPassword && (
              <Text style={styles.error}>{errors.confirmarPassword}</Text>
            )}

            {errorGeneral && <Text style={styles.error}>{errorGeneral}</Text>}

            <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Registrarme</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.link}>¿Ya tienes cuenta? Inicia Sesión</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 26, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 10, padding: 12, marginBottom: 10 },
  button: { backgroundColor: "#34C759", padding: 15, borderRadius: 10, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
  link: { marginTop: 15, textAlign: "center", color: "#007AFF" },
  error: { color: "red", fontSize: 12, marginBottom: 5 },
});

export default RegisterScreen;
