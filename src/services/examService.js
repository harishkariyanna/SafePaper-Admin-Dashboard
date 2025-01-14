import axiosInstance from './axiosConfig';

export const examService = {
  async scheduleExam(examData) {
    try {
      console.log('Scheduling exam:', examData);
      const response = await axiosInstance.post('/exams/schedule', examData);
      console.log('Exam scheduled successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error scheduling exam:', error);
      throw error;
    }
  },

  async getCurrentExam() {
    try {
      console.log('Fetching current exam');
      const response = await axiosInstance.get('/exams/current');
      console.log('Current exam fetched successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching current exam:', error);
      throw error;
    }
  },

  async deleteExam(examId) {
    try {
      console.log('Deleting exam:', examId);
      const response = await axiosInstance.delete(`/exams/${examId}`);
      console.log('Exam deleted successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error deleting exam:', error);
      throw error;
    }
  }
}; 