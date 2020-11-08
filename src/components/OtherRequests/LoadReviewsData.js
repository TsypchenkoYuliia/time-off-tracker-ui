import { getMyReviews, getUsers } from '../Axios';

export async function loadData(setUser, setData, setLoading, approvedSetting) {
  await getUsers('', '').then(({ data }) => {
    setUser(data);
  });
  await loadReviews();

  async function loadReviews() {
    await getMyReviews().then(({ data }) => {
      const isNew = data.filter((item) => item.isApproved === approvedSetting);
      setData(isNew);
      setLoading(false);
    });
  }
}
