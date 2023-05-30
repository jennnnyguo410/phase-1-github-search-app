document.addEventListener('DOMContentLoaded', () => {
    //声明一些相关变量
    const searchForm = document.getElementById('github-form')
    const userList = document.getElementById('user-list')
    const repoList = document.getElementById('repos-list')

    //为表单提供submit EventListener
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const searchInput = document.getElementById('search')
        const searchResult = searchInput.value

        //fetch input内容的API
        fetch(`https://api.github.com/search/users?q=${searchResult}`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        })
            .then(res => res.json())
            .then(data => {
                //displayUsers 在display 所抓取到的内容
                displayUsers(data.items)
            })
            .catch((error) => {
                console.log('Error', error)
            });// End of Fetch

        function displayUsers(users) {
            users.forEach((user) => {
                // 创建一个列表项元素
                const userItem = document.createElement('li')

                //创建用户头像元素
                const avatar = document.createElement('img')
                avatar.src = user.avatar_url
                avatar.alt = 'AVATAR'
                userItem.appendChild(avatar)

                //创建用户名元素
                const userName = document.createElement('a')
                userName.href = user.html_url
                userName.textContent = user.login
                userItem.appendChild(userName)

                //将列表项添加到用户列表
                userList.appendChild(userItem)

                //为每个用户添加点击事件监听器
                userItem.addEventListener('click', () => {
                    // 清空之前的仓库结果
                    repoList.innerHTML = ''
                    // 调用函数获取用户仓库
                    getUserRepos(user.login);
                })
            })
        };// End of displayUsers


        function getUserRepos(userName) {
            const apiURL = `https://api.github.com/users/${userName}/repos`
            fetch(apiURL)
                .then(res => res.json())
                .then(data => {
                    //抓取repo数据
                    displayUserRepos(data)
                })
                .catch((error) => {
                    console.log('Error', error)
                });// End of Fetch
        };//End of getUserRepos

        function displayUserRepos(repos) {
            //每一个repo数据
            repos.forEach((repo) => {
                //添加repolik
                const repoItem = document.createElement('li')
                const repoLink = document.createElement('a')
                repoLink.href = repo.html_url
                repoLink.textContent = `${searchResult}'s repos`
                repoItem.appendChild(repoLink)
                repoList.appendChild(repoItem)
            })
        };//End of displayUserRepos

    }); // End of submitBtn EventListene

}); // End of the document loaded