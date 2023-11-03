import LinkRepository from "../database/repositories/LinkRepository";

export default class linkService {
  static async update(data) {
    try {
      const record = await LinkRepository.updateLink(data);
      return record;
    } catch (error) {
      throw error;
    }
  }

  static async getId(docId) {
    try {
      const record = await LinkRepository.getById(docId);
      return record;
    } catch (error) {
      throw error;
    }
  }
  static async save(links, docId) {
    try {
      const data = await LinkRepository.save(links, docId);
      return data;
    } catch (error) {
      throw error;
    }
  }
  static async delete(docID) {
    try {
      const data = await LinkRepository.delete(docID);
      return data;
    } catch (error) {
      throw error;
    }
  }
}
