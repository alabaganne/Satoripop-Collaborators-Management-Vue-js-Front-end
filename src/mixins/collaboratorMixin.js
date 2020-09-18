import axios from 'axios';
export default {
    methods: {
        fetchCollaborators(itemsPerPage = 8, currentPageUrl = 1, searchInput = "") {
            let payload = {
                'search_text': searchInput,
                'items_per_page': itemsPerPage
            }
            return new Promise(resolve => {
                axios.post(`/collaborators?page=${currentPageUrl}`, payload).then(response => {
                    resolve(response);
                }).catch(error => {
                    if(error.response.status === 401) {
                        console.error('AUTH ERROR ON "main.js"');
                    } else {
                        console.error(error);
                    }
                })
            })
            
        },
    }
}