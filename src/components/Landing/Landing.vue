<script setup>
import './landing.css'
import { useRouter } from 'vue-router';
const router = useRouter();

function login() {
    router.push('/login')
}
</script>
<template>
    <section id="landing" class="d-flex flex-column align-items-center mt-5">
        <h2 class="display-1 text-center">Escribe, planifica y organiza tu día</h2>
        <p class="display-6">Comienza ahora para no perderte nada</p>
        <div class="w-50">
            <img class="w-100 h-100"
                src="https://www.notion.so/cdn-cgi/image/format=webp,width=3840/https://images.ctfassets.net/spoqsaf9291f/3aQs9PTDRM8Rj1gIQfNGeG/a0af6bf6ad27e40abfd0c6fb35dcb825/hero_xmas-rev.png"
                alt="">
        </div>

        <section id="carouselExampleIndicators" class="carousel slide w-50">
            <section class="carousel-indicators">
                <article data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                    class="active border border-primary" aria-current="true" aria-label="Slide 1">
                    <p class="display-6">Crea</p>
                    <div>
                        <p class="fs-5 text-center">Crea tus notas con solo inciar sesión y gestiona todas ellas.</p>
                    </div>
                </article>
                <article data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" class="border border-primary"
                    aria-label="Slide 2">
                    <p class="display-6">Organiza</p>
                    <p class="fs-5 text-center">Organiza tus tareas diarias para ser más productivo con tu día.</p>
                </article>
                <article data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" class="border border-primary"
                    aria-label="Slide 3">
                    <p class="display-6">Completa</p>
                    <p class="fs-5 text-center">Gestiona tus notas y marcalas como completadas.</p>
                </article>
            </section>
            <section class="carousel-inner">
                <div class="carousel-item active">
                    <img src="./img/hero_01.png" class="d-block w-100" alt="Index para crear notas">
                </div>
                <div class="carousel-item ">
                    <img src="./img/hero_02.png" class="d-block w-100" alt="Se muestra como crear una nota">
                </div>
                <div class="carousel-item ">
                    <img src="./img/hero_03.png" class="d-block w-100" alt="Se completa la nota">
                </div>
            </section>
        </section>
    </section>
</template>