<template>
    <div class="statistic-block doughnut-gram-container">
        <Chart class="doughnut-gram" type="doughnut" :data="chartData" :options="chartOptions"/>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";



const chartData = ref();
const chartOptions = ref({
    plugins: {
            legend: {
                display: true,
                position: 'bottom',
                align: 'top',
                labels: {
                    usePointStyle: true,
                    color: '#484848',
                    boxWidth: 14,
                    font: {
                        size: 12
                    },
                }
            }
        }
});

const setChartData = () => {
    const documentStyle = getComputedStyle(document.body);

    return {
        labels: ['Выполнено', 'Ожидают проверки', 'Проверено', 'Не выполнено'],
        datasets: [
            {
                data: [5, 2, 3, 10],
                backgroundColor: ['#a3ee58', '#eebc58', '#db8ee7', '#a7d8df'],
                hoverBackgroundColor: ['#83ea1c', '#f8b226', '#e667f9', '#8edbe7']
            }
        ]
    };
};

onMounted(() => {
    chartData.value = setChartData();
});
</script>

<style scoped>
.doughnut-gram-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 260px;
    height: 260px;
}
.doughnut-gram {
    width: 100%;
    height: 100%;
}
</style>
