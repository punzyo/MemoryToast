const api = {
  hostname: "https://chouyu.site/api/1.0",
  // hostname: "https://api.appworks-school.tw/api/1.0",
  async getProducts(category, paging) {
    console.log(`${this.hostname}/products/${category}?paging=${paging}`)
    const response = await fetch(
      `${this.hostname}/products/${category}?paging=${paging}`
    );
    return await response.json();
  },
  async getCampaigns() {
    const response = await fetch(`${this.hostname}/marketing/campaigns`);
    return await response.json();
  },
  async searchProducts(keyword, paging) {
    const response = await fetch(
      `${this.hostname}/products/search?keyword=${keyword}&paging=${paging}`
    );
    return await response.json();
  },
  async getProduct(id) {
    const response = await fetch(`${this.hostname}/products/details?id=${id}`);
    return await response.json();
  },
  async checkout(data, jwtToken) {
    const response = await fetch(`${this.hostname}/order/checkout`, {
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      }),
      method: "POST",
    });
    return await response.json();
  },
  async signin(loginData) {
    try {
      const response = await fetch(`${this.hostname}/user/signin`, {
        body: JSON.stringify(loginData),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("sign in failed");
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  },
  async getProfile(token) {
    try {
      const response = await fetch(`${this.hostname}/user/profile`, {
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }),
      });
      if (!response.ok) throw new Error("token not valid");
      return await response.json();
    } catch (err) {
      console.error(err);
    }
  },
};

export default api;
