import { StyleSheet } from "react-native"
import { colors } from "@/app/styles/colors"

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 62,
    backgroundColor: colors.gray[900],
  },
  header: {
    paddingHorizontal: 24,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  backButton: {
    padding: 6,
  },
  headerTitle: {
    color: colors.gray[100],
    fontSize: 18,
    fontWeight: "600",
  },
  content: {
    paddingHorizontal: 24,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignSelf: "center",
    marginBottom: 12,
  },
  changePhoto: {
    alignSelf: "center",
    marginBottom: 24,
  },
  changePhotoText: {
    color: colors.green[300],
  },
  label: {
    color: colors.gray[400],
    marginBottom: 6,
    marginTop: 8,
  },
  input: {
    backgroundColor: colors.gray[800],
    color: colors.gray[100],
    padding: 12,
    borderRadius: 8,
  },
  saveButton: {
    marginTop: 24,
    backgroundColor: colors.green[300],
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: colors.gray[900],
    fontWeight: "600",
  },
  /* card and profile-specific styles */
  card: {
    backgroundColor: colors.gray[800],
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    gap: 8,
  },
  name: {
    color: colors.gray[100],
    fontSize: 20,
    fontWeight: "700",
    marginTop: 6,
  },
  username: {
    color: colors.gray[300],
    fontSize: 14,
    marginTop: 2,
  },
  email: {
    color: colors.gray[300],
    fontSize: 14,
    marginTop: 6,
  },
})

export default profileStyles
