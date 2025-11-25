        function copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => {
                const message = document.getElementById('copiedMessage');
                message.classList.add('show');

                setTimeout(() => {
                    message.classList.remove('show');
                }, 2000);
            }).catch(err => {
                console.error('Erro ao copiar texto: ', err);
            });
        }