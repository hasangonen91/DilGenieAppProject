import firestore from '@react-native-firebase/firestore';
import type {WhereFilterOp} from 'firebase/firestore';

/**
 * Firestore servis katmanı.
 * Tüm Firestore işlemleri burada merkezileştirilir ve hata yönetimi yapılır.
 */
const firestoreService = {
  /**
   * Belirtilen koleksiyondaki tüm belgeleri getirir.
   * @param collectionName Koleksiyon adı
   * @returns Belgelerin dizisi
   */
  async getCollection(collectionName: string): Promise<any[]> {
    try {
      const snapshot = await firestore().collection(collectionName).get();
      return snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    } catch (error: any) {
      throw new Error(`Firestore veri getirme hatası: ${error.message}`);
    }
  },

  /**
   * Belirtilen koleksiyona yeni bir belge ekler.
   * @param collectionName Koleksiyon adı
   * @param data Eklenecek veri
   * @returns Eklenen belgenin ID'si
   */
  async addDocument(collectionName: string, data: any): Promise<string> {
    try {
      const docRef = await firestore().collection(collectionName).add(data);
      return docRef.id;
    } catch (error: any) {
      throw new Error(`Firestore belge ekleme hatası: ${error.message}`);
    }
  },

  /**
   * Belirtilen belgeyi günceller.
   * @param collectionName Koleksiyon adı
   * @param docId Güncellenecek belge ID'si
   * @param data Güncellenecek alanlar
   */
  async updateDocument(
    collectionName: string,
    docId: string,
    data: any,
  ): Promise<void> {
    try {
      await firestore().collection(collectionName).doc(docId).update(data);
    } catch (error: any) {
      throw new Error(`Firestore belge güncelleme hatası: ${error.message}`);
    }
  },

  /**
   * Belirtilen belgeyi siler.
   * @param collectionName Koleksiyon adı
   * @param docId Silinecek belge ID'si
   */
  async deleteDocument(collectionName: string, docId: string): Promise<void> {
    try {
      await firestore().collection(collectionName).doc(docId).delete();
    } catch (error: any) {
      throw new Error(`Firestore belge silme hatası: ${error.message}`);
    }
  },

  /**
   * Tek bir belgeyi getirir.
   * @param collectionName Koleksiyon adı
   * @param docId Belge ID'si
   * @returns Belge verisi veya null
   */
  async getDocument(
    collectionName: string,
    docId: string,
  ): Promise<any | null> {
    try {
      const docSnap = await firestore()
        .collection(collectionName)
        .doc(docId)
        .get();
      if (!docSnap.exists) {
        return null;
      }
      return {id: docSnap.id, ...docSnap.data()};
    } catch (error: any) {
      throw new Error(`Firestore belge getirme hatası: ${error.message}`);
    }
  },

  /**
   * Basit bir field karşılaştırmalı sorgu yapar.
   * @param collectionName Koleksiyon adı
   * @param field Alan adı
   * @param operator Firestore karşılaştırma operatörü (==, <, >, <=, >=, !=, in, not-in, array-contains, array-contains-any)
   * @param value Karşılaştırılacak değer
   * @returns Eşleşen belgelerin dizisi
   */
  async queryCollection(
    collectionName: string,
    field: string,
    operator: WhereFilterOp,
    value: any,
  ): Promise<any[]> {
    try {
      const q = firestore()
        .collection(collectionName)
        .where(field, operator, value);
      const snapshot = await q.get();
      return snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    } catch (error: any) {
      throw new Error(`Firestore sorgu hatası: ${error.message}`);
    }
  },
};

export default firestoreService;
