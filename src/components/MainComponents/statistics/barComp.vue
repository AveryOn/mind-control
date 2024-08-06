<template>
    <div class="statistic-block bar-gram-container">
        <Chart class="bar-gram" type="bar" :data="chartData" :options="chartOptions" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const chartData = ref({
    labels: [1, 2, 3, 4, 5, 6, ],
    datasets: [
        {
            label: 'Успешные тесты (%)',
            backgroundColor: '#aaff60',
            borderColor: '#92f938',
            data: [54, 17, 28, 48, 24, 51, ]
        },
        {
            label: 'Проваленные тесты (%)',
            backgroundColor: '#ff6060',
            borderColor: '#ff4848',
            data: [18, 38, 22, 34, 25, 29, ],
        }
    ]

});
const chartOptions = ref({
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
        legend: {
            labels: {
                color: 'black'
            }
        }
    },
    scales: {
        x: {
            title: {
                display: true,
                text: 'Временная шкала (Дни)'
            },
            ticks: {
                color: 'gray',
                font: {
                    weight: 900
                }
            },
            grid: {
                display: false,
                drawBorder: false
            },
            beginAtZero: false,
        },
        y: {
            title: {
                display: true,
                text: 'Проценты %'
            },
            ticks: {
                color: 'gray'
            },
            grid: {
                color: 'gray',
                drawBorder: true
            },
            beginAtZero: true,
        }
    }
});

</script>

<style scoped>
.bar-gram-container {
    width: 860px;
    height: 360px;
}

.bar-gram {
    width: 100%;
    height: 100%;
}
</style>
