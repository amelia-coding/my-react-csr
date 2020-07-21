// 添加状态
const INCREMENT = 'INCREMENT';

import { RootState } from '@src/store';
import { requestData } from '../../../utils/request';

export interface SourceStateDeclaration {
  data: {
    [propName: string]: object[];
  };
}

const state: SourceStateDeclaration = {
  data: {},
};

export default {
  name: 'source',
  state,
  reducers: {
    setData: (state: SourceStateDeclaration, payload): SourceStateDeclaration => {
      state.data = payload;
      return state;
    },
  },
  effects: {
    async setDataSource(payload, rootState: RootState, meta) {
      const result = await requestData(payload.gql);
      this.setData(result);
    },
  },
};
