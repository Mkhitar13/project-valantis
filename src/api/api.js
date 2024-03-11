import axios from "axios";
import md5 from "md5";

const API_PASSWORD = 'Valantis';
const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
const authString = md5(`${API_PASSWORD}_${timestamp}`);
const FIRST_API_URL = `http://api.valantis.store:40000/`;
const SECOND_API_URL = `http://api.valantis.store:41000/`;

async function checkURL(url) {
   try {
      const response = await axios.get(url);
      return response.status === 200;
   }
   catch (error) {
      return false;
   }
}

async function main() {
   const firstUrlAvailable = await checkURL(FIRST_API_URL);
   return firstUrlAvailable ? true : false;
}

class ApiClient {
   async sendRequest(action, params) {
      try {
         const URL = await main() ? FIRST_API_URL : SECOND_API_URL;
         const response = await axios.post(
            URL,
            { action, params },
            {
               headers: {
                  'X-Auth': authString,
               }
            }
         );
         return response.data.result;
      } catch (error) {
         console.error('API error:', error);
         throw error;
      }
   };

   getIdsFromApi = async (offset, limit) => {
      const ids = await this.sendRequest("get_ids", { offset, limit });
      const uniqIds = [...new Set(ids)];
      return uniqIds;
   };

   getProductsFromApi = async (offset, limit) => {
      const ids = await this.getIdsFromApi(offset, limit);
      const productsRequest = await this.sendRequest("get_items", { ids });
      return productsRequest;
   };

   getFieldsFromApi = async (field, offset, limit) => {
      const fieldRequest = await this.sendRequest('get_fields', { field, offset, limit });
      return fieldRequest;
   };

   filterByFieldFromApi = async (field, value) => {
      let checkFieldType = false;
      if (field === "price") {
         checkFieldType = true;
      }
      const paramsField = {
         params: {
            [field]: checkFieldType ? +(value) : value
         }
      };
      return await this.sendRequest('filter', paramsField.params);
   };

   getFilterByFieldFromApi = async (field, value) => {
      const filteredIds = await this.filterByFieldFromApi(field, value);
      const productsRequest = await this.sendRequest("get_items", { ids: filteredIds });
      return productsRequest;
   };

}

export default ApiClient;