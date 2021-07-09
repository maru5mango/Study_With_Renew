import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';
import { likeApi } from '../api/like';
import { ILike, IMyLikeProject, IMyLikeUser } from '../api/types';

type LikeState = {
  likeProjects: {
    projects: ILike[];
    loading: boolean;
    error: null | Error;
  };
  likeUsers: {
    users: ILike[];
    loading: boolean;
    error: null | Error;
  };
  myLikeProjects: {
    projects: IMyLikeProject[];
    loading: boolean;
    error: null | Error;
  };
  myLikeUsers: {
    users: IMyLikeUser[];
    loading: boolean;
    error: null | Error;
  };
  projectLikeUsers: {
    [id: string]: {
      users: IMyLikeUser[];
      loading: boolean;
      error: null | Error;
    };
  };
};

const initialState: LikeState = {
  likeProjects: {
    projects: [],
    loading: false,
    error: null,
  },
  likeUsers: {
    users: [],
    loading: false,
    error: null,
  },
  myLikeProjects: {
    projects: [],
    loading: false,
    error: null,
  },
  myLikeUsers: {
    users: [],
    loading: false,
    error: null,
  },
  projectLikeUsers: {},
};

export const fetchLikeProjects = createAsyncThunk<
  {
    likeProjects: ILike[];
  },
  undefined,
  { state: RootState }
>('like/fetchLikeProjects', async (_, { rejectWithValue }) => {
  try {
    const likeProjects = await likeApi.getLikeProjects();
    return {
      likeProjects: likeProjects.data.likes,
    };
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const fetchLikeUsers = createAsyncThunk<
  {
    likeUsers: ILike[];
  },
  undefined,
  { state: RootState }
>('like/fetchLikeUsers', async (_, { rejectWithValue }) => {
  try {
    const likeUsers = await likeApi.getLikeUsers();
    return {
      likeUsers: likeUsers.data.likes,
    };
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const fetchMyLikeProjects = createAsyncThunk<
  {
    myLikeProjects: IMyLikeProject[];
  },
  string | null,
  { state: RootState }
>('like/fetchMyLikeProjects', async (id, { rejectWithValue }) => {
  try {
    const myLikeProjects = await likeApi.postMyLikeProjects(id);
    return {
      myLikeProjects: myLikeProjects.data.projects,
    };
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const fetchMyLikeUsers = createAsyncThunk<
  {
    myLikeUsers: IMyLikeUser[];
  },
  string | null,
  { state: RootState }
>('like/fetchMyLikeUsers', async (id, { rejectWithValue }) => {
  try {
    const myLikeUsers = await likeApi.postMyLikeUsers(id);
    return {
      myLikeUsers: myLikeUsers.data.users,
    };
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const fetchProjectLikeUsers = createAsyncThunk<
  {
    projectLikeUsers: IMyLikeUser[];
  },
  string,
  { state: RootState }
>('like/fetchProjectLikeUsers', async (id, { rejectWithValue }) => {
  try {
    const projectLikeUsers = await likeApi.postProjectLikeUsers(id);
    return {
      projectLikeUsers: projectLikeUsers.data.users,
    };
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const likeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Projects
    builder.addCase(fetchLikeProjects.pending, (state, action) => {
      state.likeProjects.loading = true;
    });
    builder.addCase(fetchLikeProjects.fulfilled, (state, action) => {
      const { likeProjects } = action.payload;
      state.likeProjects = {
        projects: likeProjects,
        loading: false,
        error: null,
      };
    });
    builder.addCase(fetchLikeProjects.rejected, (state, action) => {
      state.likeProjects.error = action.error as Error;
      state.likeProjects.loading = false;
    });

    // Users
    builder.addCase(fetchLikeUsers.pending, (state, action) => {
      state.likeUsers.loading = true;
    });
    builder.addCase(fetchLikeUsers.fulfilled, (state, action) => {
      const { likeUsers } = action.payload;
      state.likeUsers = {
        users: likeUsers,
        loading: false,
        error: null,
      };
    });
    builder.addCase(fetchLikeUsers.rejected, (state, action) => {
      state.likeUsers.error = action.error as Error;
      state.likeUsers.loading = false;
    });

    // myLikeProjects
    builder.addCase(fetchMyLikeProjects.pending, (state, action) => {
      state.myLikeProjects.loading = true;
    });
    builder.addCase(fetchMyLikeProjects.fulfilled, (state, action) => {
      const { myLikeProjects } = action.payload;
      state.myLikeProjects = {
        projects: myLikeProjects,
        loading: false,
        error: null,
      };
    });
    builder.addCase(fetchMyLikeProjects.rejected, (state, action) => {
      state.myLikeProjects.error = action.error as Error;
      state.myLikeProjects.loading = false;
    });

    // myLikeUsers
    builder.addCase(fetchMyLikeUsers.pending, (state, action) => {
      state.myLikeUsers.loading = true;
    });
    builder.addCase(fetchMyLikeUsers.fulfilled, (state, action) => {
      const { myLikeUsers } = action.payload;
      state.myLikeUsers = {
        users: myLikeUsers,
        loading: false,
        error: null,
      };
    });
    builder.addCase(fetchMyLikeUsers.rejected, (state, action) => {
      state.myLikeUsers.error = action.error as Error;
      state.myLikeUsers.loading = false;
    });

    // projectLikeUsers
    builder.addCase(fetchProjectLikeUsers.pending, (state, action) => {
      state.projectLikeUsers[action.meta.arg] = {
        users: [],
        loading: true,
        error: null,
      };
    });
    builder.addCase(fetchProjectLikeUsers.fulfilled, (state, action) => {
      const { projectLikeUsers } = action.payload;
      state.projectLikeUsers[action.meta.arg] = {
        users: projectLikeUsers,
        loading: false,
        error: null,
      };
    });
    builder.addCase(fetchProjectLikeUsers.rejected, (state, action) => {
      state.projectLikeUsers[action.meta.arg].error = action.error as Error;
      state.projectLikeUsers[action.meta.arg].loading = false;
    });
  },
});

export default likeSlice.reducer;
