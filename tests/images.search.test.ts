import {axiosInstance, baseURL} from '../utils/axiosInstance';
import axios from 'axios';

describe('POST /images/search - Search for images', () => {
    const endpoint = '/images/search';

    it('should return 200 and relevant results for a valid search query', async () => {
        const response = await axiosInstance.post(endpoint, {
            searchQuery: 'cat'
        });

        expect(response.status).toBe(200);
        expect(Array.isArray(response.data.results)).toBe(true);
    });

    it('should return 400 for missing "query" in request body', async () => {
        try {
            await axiosInstance.post(endpoint, {});
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                expect(error.response.status).toBe(400);
            }
        }
    });

    it('should return 400 if "query" is an empty string', async () => {
        try {
            await axiosInstance.post(endpoint, { searchQuery: "" });
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                expect(error.response.status).toBe(400);
            }
        }
    });

    it('should return 401 if no API key is provided', async () => {
        try {
            await axios.post(`${baseURL}/images/search`, {
                searchQuery: 'cat'
            }); // No API key
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                expect(error.response.status).toBe(401);
            }
        }
    });

    it('should return 403 if API key is invalid', async () => {
        try {
            await axios.post(`${baseURL}/images/search`, {
                searchQuery: 'cat'
            }, {
                headers: {
                    'X-Api-Key': 'invalid-key',
                    'Content-Type': 'application/json',
                }
            });
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                expect(error.response.status).toBe(403);
            }
        }
    });
});
