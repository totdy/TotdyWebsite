<template>
    <div class="container">
        <header>
            <div class="title">totdy</div>
            <nav>
                <RouterLink class="" to="/">Home</RouterLink>
                <RouterLink class="" to="/games">Games</RouterLink>
                <RouterLink class="" to="/about">About</RouterLink
                >
            </nav>
        </header>
        <main class="p-7 grow">
            <RouterView></RouterView>
        </main>
        <footer class="p-7 shrink-0">
            <RouterLink to="/privacyPolicy">Privacy Policy</RouterLink>
        </footer>
    </div>
</template>

<style scoped>
.container {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.container header {
    padding: 1.5rem;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    flex-wrap: wrap;
    align-items: center;
}

header .title {
    font-size: 3rem;
    line-height: 1;
}

header nav {
    display: flex;
    flex-direction: row;
    gap: 1.25rem;
    cursor: pointer;
    color: #6b7280;
}

header nav:hover {
    color: #d1d5db;
}
</style>
