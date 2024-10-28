<script lang="ts">
    import {onMount} from "svelte";
    import { Chart } from "chart.js/auto";
    import {PUBLIC_API_URL} from "$env/static/public";

    let chart1: HTMLCanvasElement;
    let chart2: HTMLCanvasElement;

    let roomsChartContext: CanvasRenderingContext2D;
    let trophyChartContext: CanvasRenderingContext2D;

    let roomsChart: Chart;
    let trophyChart: Chart;

    let chartOptions = {
        maintainAspectRatio: false,
        scales: {
            x: {
                ticks: {
                    includeBounds: true,
                        maxRotation: 50,
                        minRotation: 50,
                        maxTicksLimit: 5,
                }
            }
        }
    }

    async function loadData() {
        const response = await fetch(`${PUBLIC_API_URL}/api/stats/numerical_stats?startTime=2024-01-01&endTime=2024-10-28`, {credentials: "include"});
        var data: NumericalStats = await response.json();

        roomsChart.data.labels = data.labels;
        roomsChart.data.datasets.push({
            label: "Online Players",
            data: data.playersOnline
        });
        roomsChart.data.datasets.push({
            label: "Online Worlds",
            data: data.onlineRoomCount
        });
        roomsChart.data.datasets.push({
            label: "Active Realms",
            data: data.onlineRealmsCount
        });

        trophyChart.data.labels = data.labels;
        trophyChart.data.datasets.push({
            label: "Total Trophies Collected",
            data: data.totalTrophies,
            borderColor: '#73ff63',
            backgroundColor: '#b1ffb2',
        });


        trophyChart.update();
        roomsChart.update();
    }

    onMount(() => {
        roomsChartContext = chart1.getContext('2d')!;
        trophyChartContext = chart2.getContext('2d')!;

        roomsChart = new Chart(roomsChartContext, {
            type: 'line',
            data: {
                labels: [],
                datasets: []
            },
            options: chartOptions,
        });

        trophyChart = new Chart(trophyChartContext, {
            type: 'line',
            data: {
                labels: [],
                datasets: []
            },
            options: chartOptions,
        });

        loadData();
    });

</script>

<div class="realm-box stats">
    <div class="row">
        <div class="col-md-12 stats-container">
            <h5>Players, Worlds and Realms</h5>
            <div class="chart-container">
                <canvas bind:this={chart1}></canvas>
            </div>
        </div>
        <div class="col-md-12 stats-container">
            <h5>Total Trophies</h5>
            <div class="chart-container">
                <canvas bind:this={chart2}></canvas>
            </div>
        </div>
    </div>
</div>

<style>
    .stats {
        padding: 2em;
    }

    .stats-container {
        margin-top: 1em;
        margin-bottom: 1em;
        text-align: center;
    }

    .chart-container {
        position: relative;
        height: 30vh;
        width: 100%;
    }
</style>