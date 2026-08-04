
    (function() {
        var tb = document.getElementById('tooltip-CCB');

        document.addEventListener('mouseover', function(e) {
            var el = e.target.closest('[data-tip]');
            if (!el) return;

            var text = el.getAttribute('data-tip');
            if (!text) return;

            tb.textContent = text;
            tb.style.display = 'block';

            // Get element position
            var rect = el.getBoundingClientRect();
            // Show temporarily at 0,0 to get real size
            tb.style.left = '0';
            tb.style.top = '0';
            tb.style.visibility = 'hidden';
            tb.offsetHeight; // force reflow
            tb.style.visibility = 'visible';

            var tbW = tb.offsetWidth;
            var tbH = tb.offsetHeight;

            // Center above element
            var left = rect.left + rect.width / 2 - tbW / 2;
            var top = rect.top - tbH - 12;

            // Horizontal bounds
            if (left < 8) left = 8;
            if (left + tbW > window.innerWidth - 8) {
                left = window.innerWidth - tbW - 8;
            }

            // Flip below if no room above
            if (top < 8) {
                top = rect.bottom + 12;
                tb.classList.add('flip');
            } else {
                tb.classList.remove('flip');
            }

            tb.style.left = left + 'px';
            tb.style.top = top + 'px';
        });

        document.addEventListener('mouseout', function(e) {
            var el = e.target.closest('[data-tip]');
            if (!el) return;
            // Only hide if leaving to outside tooltip
            if (!e.relatedTarget || !e.relatedTarget.closest('#tooltip-CCB')) {
                tb.style.display = 'none';
            }
        });

        // Hide tooltip on scroll
        document.addEventListener('scroll', function() {
            tb.style.display = 'none';
        }, true);
    })();
    