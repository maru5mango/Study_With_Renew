import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';
import { homeApi } from '../api/home';
import { IUser, IProject } from '../api/types';

interface HomeState {
  recentProjects: IProject[];
  recruitmentProjects: IProject[];
  newUsers: IUser[];
  waitUsers: IUser[];
  loading: boolean;
  error: null | Error;
}

const initialState = {
  recentProjects: [],
  recruitmentProjects: [],
  newUsers: [],
  waitUsers: [],
  loading: false,
  error: null,
} as HomeState;

export const fetchHomeList = createAsyncThunk<
  {
    recentProjects: IProject[];
    recruitmentProjects: IProject[];
    newUsers: IUser[];
    waitUsers: IUser[];
  },
  undefined,
  { state: RootState }
>('home/fetchHomeList', async (_, { rejectWithValue }) => {
  try {
    const recentProjects = await homeApi.getResentProjects();
    const recruitmentProjects = await homeApi.getRecruitmentProjects();
    const newUsers = await homeApi.getNewUsers();
    const waitUsers = await homeApi.getWaitUsers();
    return {
      recentProjects: recentProjects.data.projects,
      recruitmentProjects: recruitmentProjects.data.projects,
      newUsers: newUsers.data.users,
      waitUsers: waitUsers.data.users,
    };
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHomeList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchHomeList.fulfilled, (state, action) => {
      const { recentProjects, recruitmentProjects, newUsers, waitUsers } =
        action.payload;
      return {
        recentProjects,
        recruitmentProjects,
        newUsers,
        waitUsers,
        loading: false,
        error: null,
      };
    });
    builder.addCase(fetchHomeList.rejected, (state, action) => {
      state.error = action.error as Error;
      state.loading = false;
    });
  },
});

export default homeSlice.reducer;
