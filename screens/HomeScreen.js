import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { useLayoutEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const events = [
  {
    id: 1,
    title:
      "TÜBİTAK 1812 BİGG “Yatırım Tabanlı Girişimcilik Destek Programı” 2024 Yılı 2. Çağrı Başvuruları Açıldı!",
    description:
      "BAU Hub; TÜBİTAK 1812 BİGG Yatırım Tabanlı Girişimcilik Destek Programı özelinde geleceğe katkı sağlayacak teknolojik ve yenilikçi proje başvurularınızı bekliyor!",
    imageUri:
      "https://cdn.bau.edu.tr/news/1yyuqtlc74uv6-Ads%C4%B1z%20tasar%C4%B1m%20(1).png",
  },
  {
    id: 2,
    title: "BAU TIP 3.Intern Sempozyumu",
    description:
      "Bahçeşehir Üniversitesi Tıp Fakültesi olarak düzenleyeceğimiz 3. İntern Sempozyumu'na hepinizi davet ediyoruz. Bu önemli etkinlik, 3-7 Haziran 2024 tarihleri arasında, Göztepe Yerleşkemizde gerçekleşecektir.",
    imageUri:
      "https://cdn.bau.edu.tr/news/a7rk5lyzg7rpc-Ads%C4%B1z%20tasar%C4%B1m.png",
  },
  {
    id: 3,
    title:
      "Bahçeşehir Üniversitesi 2024-2025 Akademik Yılı Yüksek Lisans Başvuruları Başladı!",
    description:
      "Bahçeşehir Üniversitesi, 2024-2025 akademik yılı yüksek lisans programlarımıza başvurular başlamıştır. Üniversitemiz, çeşitli disiplinlerde gelişmiş eğitim programları sunarak öğrencilerin akademik ve profesyonel gelişimine katkıda bulunmaktadır.",
    imageUri: "https://cdn.bau.edu.tr/news/5qard8nv06ta6-leebau.jpeg",
  },
  {
    id: 4,
    title:
      "Bahçeşehir Üniversitesi Asya’daki En İyi Üniversiteler Arasında Yer Aldı!",
    description:
      "Dünyanın en itibarlı derecelendirme kuruluşu olan Times Higher Education (THE), ‘2024 THE Asya Üniversiteleri’ sıralamasının sonuçlarını açıkladı. Bahçeşehir Üniversitesi sıralamada 196’ncı, Türkiye’de ise 9.sırada yer aldı.",
    imageUri:
      "https://cdn.bau.edu.tr/news/5dck2ld9yn4u7-ddjrbu8a1siqc-5zivbce37yr3p-bau%20bahar%20duyuru.png",
  },
  {
    id: 5,
    title:
      "Bahçeşehir Üniversitesi Asya’daki En İyi Üniversiteler Arasında Yer Aldı!",
    description:
      "Dünyanın en itibarlı derecelendirme kuruluşu olan Times Higher Education (THE), ‘2024 THE Asya Üniversiteleri’ sıralamasının sonuçlarını açıkladı. Bahçeşehir Üniversitesi sıralamada 196’ncı, Türkiye’de ise 9.sırada yer aldı.",
    imageUri:
      "https://cdn.bau.edu.tr/news/mvmz71apkvu9g-Ads%C4%B1z%20tasar%C4%B1m.png",
  },
  {
    id: 6,
    title: "Bahçeşehir Üniversitesinden Uluslararası Yapay Zeka Zirvesi",
    description:
      "Son yıllara damgasını vuran yapay zeka teknolojisinin dünyanın geleceğini nasıl etkileyeceği, Bahçeşehir Üniversitesi’nin (BAU) ev sahipliğinde İstanbul’da yapılacak Uluslararası Yapay Zeka Zirvesi’nde konuşulacak.",
    imageUri: "https://cdn.bau.edu.tr/news/66witnrjwfzsi-aisummithaber.png",
  },
];

function HomeScreen({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable style={styles.searchButton}>
          <Feather name="search" size={24} color="#07aff7" />
        </Pressable>
      ),
      headerLeft: () => (
        <Pressable style={styles.menuButton}>
          <Entypo name="menu" size={24} color="#07aff7" />
        </Pressable>
      ),
    });
  }, [navigation]);

  const renderItem = ({ item }) => (
    <Pressable style={styles.eventContainer}>
      <Image source={{ uri: item.imageUri }} style={styles.eventImage} />
      <Text style={styles.eventTitle}>{item.title}</Text>
      <Text style={styles.eventDescription}>{item.description}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>NEWS</Text>
      </View>
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerContainer: {
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 10,
  },
  headerText: {
    fontFamily: "plusjakartasans-regular",
    fontSize: 16,
  },
  searchButton: {
    marginRight: 18,
  },
  menuButton: {
    marginLeft: 18,
  },
  eventContainer: {
    padding: 15,
    borderBottomWidth: 5,
    borderBottomColor: "#ddd",
  },
  eventImage: {
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
  eventTitle: {
    fontFamily: "plusjakartasans-bold",
    fontSize: 16,
    marginBottom: 5,
  },
  eventDescription: {
    fontFamily: "plusjakartasans-regular",
    fontSize: 14,
  },
});
