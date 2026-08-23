import {
  getFirestore,
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  where,
} from '@react-native-firebase/firestore';
import type {WhereFilterOp} from '@react-native-firebase/firestore';

/**
 * Firestore servis katmanı (v26 modular API).
 * Tüm Firestore işlemleri burada merkezileştirilir ve hata yönetimi yapılır.
 */
const db = getFirestore();

const firestoreService = {
  /**
   * Belirtilen koleksiyondaki tüm belgeleri getirir.
   */
  async getCollection(collectionName: string): Promise<any[]> {
    try {
      const snapshot = await getDocs(collection(db, collectionName));
      return snapshot.docs.map((d: any) => ({id: d.id, ...d.data()}));
    } catch (error: any) {
      throw new Error(`Firestore veri getirme hatası: ${error.message}`);
    }
  },

  /**
   * Belirtilen koleksiyona yeni bir belge ekler.
   */
  async addDocument(collectionName: string, data: any): Promise<string> {
    try {
      const ref = await addDoc(collection(db, collectionName), data);
      return ref.id;
    } catch (error: any) {
      throw new Error(`Firestore belge ekleme hatası: ${error.message}`);
    }
  },

  /**
   * Belirtilen belgeyi günceller.
   */
  async updateDocument(
    collectionName: string,
    docId: string,
    data: any,
  ): Promise<void> {
    try {
      await updateDoc(doc(db, collectionName, docId), data);
    } catch (error: any) {
      throw new Error(`Firestore güncelleme hatası: ${error.message}`);
    }
  },

  /**
   * Belirtilen belgeyi siler.
   */
  async deleteDocument(collectionName: string, docId: string): Promise<void> {
    try {
      await deleteDoc(doc(db, collectionName, docId));
    } catch (error: any) {
      throw new Error(`Firestore silme hatası: ${error.message}`);
    }
  },

  /**
   * Tek bir belgeyi getirir.
   */
  async getDocument(
    collectionName: string,
    docId: string,
  ): Promise<any | null> {
    try {
      const snap = await getDoc(doc(db, collectionName, docId));
      if (!snap.exists) {
        return null;
      }
      return {id: snap.id, ...(snap.data() as any)};
    } catch (error: any) {
      throw new Error(`Firestore belge getirme hatası: ${error.message}`);
    }
  },

  /**
   * Basit bir field karşılaştırmalı sorgu yapar.
   */
  async queryCollection(
    collectionName: string,
    field: string,
    operator: WhereFilterOp,
    value: any,
  ): Promise<any[]> {
    try {
      const q = query(
        collection(db, collectionName),
        where(field, operator, value),
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((d: any) => ({id: d.id, ...d.data()}));
    } catch (error: any) {
      throw new Error(`Firestore sorgu hatası: ${error.message}`);
    }
  },
};

export default firestoreService;
