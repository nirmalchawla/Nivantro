/* ============================================
   Nivantro India — Dashboard Interactivity
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Dashboard Tab Switching ----------
  const dashTabs = document.querySelectorAll('.dash-tab');
  const dashPanels = document.querySelectorAll('.dash-panel');

  dashTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.dataset.tab;

      // Update active tab
      dashTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Show corresponding panel
      dashPanels.forEach(panel => {
        panel.style.display = 'none';
        panel.classList.remove('active');
      });
      const targetPanel = document.getElementById(`panel-${targetTab}`);
      if (targetPanel) {
        targetPanel.style.display = 'block';
        targetPanel.classList.add('active');

        // Re-trigger animations for elements in the new panel
        const animElements = targetPanel.querySelectorAll('.animate-on-scroll');
        animElements.forEach((el, i) => {
          el.classList.remove('visible');
          setTimeout(() => {
            el.classList.add('visible');
          }, 80 * i);
        });
      }
    });
  });

  // ---------- Trigger initial panel animations ----------
  const activePanel = document.querySelector('.dash-panel.active');
  if (activePanel) {
    const animElements = activePanel.querySelectorAll('.animate-on-scroll');
    animElements.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add('visible');
      }, 150 + (80 * i));
    });
  }

  // ---------- Animate metric strip on load ----------
  const metricStrip = document.querySelector('.metric-strip');
  if (metricStrip) {
    setTimeout(() => {
      metricStrip.classList.add('visible');
    }, 300);
  }

  // ---------- Animate welcome header ---------- 
  const dashWelcome = document.querySelector('.dash-welcome');
  if (dashWelcome) {
    setTimeout(() => {
      dashWelcome.classList.add('visible');
    }, 100);
  }
  const dashHeaderActions = document.querySelector('.dash-header-actions');
  if (dashHeaderActions) {
    setTimeout(() => {
      dashHeaderActions.classList.add('visible');
    }, 200);
  }

});
