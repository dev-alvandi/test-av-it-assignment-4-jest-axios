import { axiosInstance, baseURL } from '../utils/axiosInstance';
import axios from 'axios';
import {longQuery} from "../utils/constants";

describe('POST /images/search - Search for images', () => {
    const endpoint = '/images/search';

    it('should return 200 and relevant results for a valid search query', async () => {
        const response = await axiosInstance.post(endpoint, {
            searchQuery: 'cat'
        });

        expect(response.status).toBe(200);
        expect(Array.isArray(response.data.results)).toBe(true);
    });

    it('should return 400 for missing "searchQuery" in request body', async () => {
        try {
            await axiosInstance.post(endpoint, {});
            throw new Error('Request should have failed with 400 but succeeded');
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                expect(error.response.status).toBe(400);
                expect(error.response.data.message).toBe('Search query is required.');
            } else {
                throw error;
            }
        }
    });

    it('should return 400 if "searchQuery" is an empty string', async () => {
        try {
            await axiosInstance.post(endpoint, { searchQuery: "" });
            throw new Error('Request should have failed with 400 but succeeded');
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                expect(error.response.status).toBe(400);
                expect(error.response.data.message).toBe('Search query is required.');
            } else {
                throw error;
            }
        }
    });

    it('should return 400 if "searchQuery" exceeds 40 characters', async () => {
        try {
            await axiosInstance.post(endpoint, {
                searchQuery: longQuery
            });
            throw new Error('Request should have failed with 400 but succeeded');
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                expect(error.response.status).toBe(400);
                expect(error.response.data.message).toBe('Search query is too long; no more than 40 characters are allowed in the query.');
            } else {
                throw error;
            }
        }
    });

    it('should return 401 if no API key is provided', async () => {
        try {
            await axios.post(`${baseURL}/images/search`, {
                searchQuery: 'cat'
            });
            throw new Error('Request should have failed with 401 but succeeded');
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                expect(error.response.status).toBe(401);
                expect(error.response.data.message).toBe('Authentication failed. Either authenticate using logging in or providing the X-Api-Key http header.');
            } else {
                throw error;
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
            throw new Error('Request should have failed with 403 but succeeded');
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                expect(error.response.status).toBe(403);
                expect(error.response.data.message).toBe('Authentication failed. Either authenticate using logging in or providing the X-Api-Key http header.');
            } else {
                throw error;
            }
        }
    });
});
