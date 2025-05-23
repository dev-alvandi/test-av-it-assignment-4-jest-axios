import { axiosInstance, baseURL } from '../utils/axiosInstance';
import axios from 'axios';

describe('GET /images - Retrieve all images', () => {
    it('should return 200 and an array of images with a valid API key', async () => {
        const response = await axiosInstance.get('/images');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.data.results)).toBe(true);
    });

    it('should return 401 if no API key is provided', async () => {
        try {
            await axios.get(`${baseURL}/images`); // No API key
            throw new Error('Request should have throw new Errored with 401 but succeeded');
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                expect(error.response.status).toBe(401);
            } else {
                console.log(error)
                throw error;
            }
        }
    });

    it('should return 403 if API key is incorrect', async () => {
        try {
            await axios.get(`${baseURL}/images`, {
                headers: {
                    'X-Api-Key': 'wrong-key',
                }
            });
            throw new Error('Request should have throw new Errored with 403 but succeeded');
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                expect(error.response.status).toBe(403);
            } else {
                throw error;
            }
        }
    });
});
