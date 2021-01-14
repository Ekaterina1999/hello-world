/*формирование отдельного поста */
const dataAPI = {
    url: "https://jsonplaceholder.typicode.com/",
    async getAllPosts() {
        return await fetch(this.url + "posts/")
            .then(res => res.json());
    },
    async getPost(postId) {
        return await fetch(this.url + "posts/" + postId)
            .then(res => res.json());
    },
    async getPostByUser(userId) {
        return await fetch(this.url + "posts/?userId=" + userId)
            .then(res => res.json());
    },
    async getAllUsers() {
        return await fetch(this.url + "users/")
            .then(res => res.json());
    },
    async getUser(userId) {
        return await fetch(this.url + "users/" + userId)
            .then(res => res.json());
    },
    async getAllComments() {
        return await fetch(this.url + "comments/")
            .then(res => res.json());
    },
    async getPostComments(postId) {
        return await fetch(this.url + "comments/?postId=" + postId)
            .then(res => res.json());
    },
    async getComment(commentId) {
        return await fetch(this.url + "comments/" + commentId)
            .then(res => res.json());
    },
}

export default dataAPI;