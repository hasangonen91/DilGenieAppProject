import NetInfo from "@react-native-community/netinfo";

export const checkInternetConnection = async () => {
    try {
        const state = await NetInfo.fetch();
        return state.isConnected;
    } catch (error) {
        console.error("İnternet bağlantısı kontrol edilemedi:", error);
        return false; // Hata durumunda bağlantı yok olarak kabul ediyoruz
    }
};
