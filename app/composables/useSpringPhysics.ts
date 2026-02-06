export function useSpringPhysics(
    tension = 0.08,
    friction = 0.15
) {
    const x = ref(0);
    const y = ref(0);
    const velocityX = ref(0);
    const velocityY = ref(0);

    // Target coordinates
    const targetX = ref(0);
    const targetY = ref(0);

    let animationFrameId: number;
    let isRunning = false;

    const animate = () => {
        const dx = targetX.value - x.value;
        const dy = targetY.value - y.value;

        // Calculate acceleration
        const ax = dx * tension;
        const ay = dy * tension;

        // Update velocity
        velocityX.value = (velocityX.value + ax) * (1 - friction);
        velocityY.value = (velocityY.value + ay) * (1 - friction);

        // Stop loop if settled
        if (
            Math.abs(dx) < 0.1 &&
            Math.abs(dy) < 0.1 &&
            Math.abs(velocityX.value) < 0.01 &&
            Math.abs(velocityY.value) < 0.01
        ) {
            x.value = targetX.value;
            y.value = targetY.value;
            isRunning = false;
            velocityX.value = 0;
            velocityY.value = 0;
            return;
        }

        // Update position
        x.value += velocityX.value;
        y.value += velocityY.value;

        animationFrameId = requestAnimationFrame(animate);
    };

    const updateTarget = (newX: number, newY: number) => {
        targetX.value = newX;
        targetY.value = newY;

        if (!isRunning) {
            isRunning = true;
            animate();
        }
    };

    onMounted(() => {
        if (import.meta.client) {
            // Initialize center
            x.value = window.innerWidth / 2;
            y.value = window.innerHeight / 2;
            targetX.value = window.innerWidth / 2;
            targetY.value = window.innerHeight / 2;
        }
    });

    onUnmounted(() => {
        if (import.meta.client) {
            cancelAnimationFrame(animationFrameId);
        }
    });

    return {
        x,
        y,
        updateTarget
    };
}
