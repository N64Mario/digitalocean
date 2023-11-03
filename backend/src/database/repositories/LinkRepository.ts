import { doc, getDoc, updateDoc } from "firebase/firestore";
import { database } from "../../../src/config/firebase";
import Redis from "ioredis";
import { error, log } from "console";
const redis = new Redis();

class LinkRepository {
  // firebase request

  static async updateLink(value) {
    try {
      const data = {
        currentIndex: 0,
        links: value.form,
      };
      redis.hset("multilinks", value.id, JSON.stringify(data));
      return value;
    } catch (error) {
      throw error;
    }
  }

  static async UpdateCurrentIndex(index, docId) {
    try {
      const docRef = doc(database, "multiLinks", docId);
      await updateDoc(docRef, { currentIndex: index });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Redise Request

  static async getById(docId) {
    return new Promise(async (resolve, reject) => {
      try {
        const singleLink = await new Promise(async (resolve, reject) => {
          await redis.hget("multilinks", docId, (err, data) => {
            if (err) {
              console.log(err);
              reject(err);
            }
            resolve(data);
          });
        });

        if (singleLink) {
          const index = await this.update(docId);
          const parsedSingleLink = JSON.parse(singleLink);
          if (parsedSingleLink.links && parsedSingleLink.links[index]) {
            resolve(parsedSingleLink.links[index]);
          } else {
            resolve(null); // Handle the case where the link or index is not found
          }
        } else {
          resolve(null); // Handle the case where the data is not found in Redis
        }
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  static save(links, docId) {
    try {
      const value = {
        currentIndex: 0,
        links: links,
      };
      redis.hset("multilinks", docId, JSON.stringify(value));
      return value;
    } catch (error) {
      throw error;
    }
  }

  static async update(docId) {
    try {
      const oldvalue = await redis.hget("multilinks", docId);
      if (oldvalue) {
        const parsedValue = JSON.parse(oldvalue);
        let currentIndex = parsedValue.currentIndex;
        const currentLength = parsedValue.links.length;

        currentIndex <= currentLength - 2
          ? (currentIndex = currentIndex + 1)
          : (currentIndex = 0);

        const newvalue = {
          currentIndex: currentIndex,
          links: parsedValue.links,
        };
        await redis.hset("multilinks", docId, JSON.stringify(newvalue));
        return currentIndex;
      }
    } catch (error) {
      throw error;
    }
  }

  static async delete(docId) {
    try {
      redis.hdel("multilinks", docId);
      return docId;
    } catch (error) {
      throw error;
    }
  }
}

export default LinkRepository;
