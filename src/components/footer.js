import styles from '../../styles/Footer.module.css'

export default function Footer() {
    return (
      <div className={styles.footerContainer}>
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <h2 className={styles.footerTitle}>¿Necesitas ayuda?</h2>
            <p className={styles.footerText}>
              Si tenés alguna duda, contactanos al{' '}
              <a
                href="https://wa.me/54226715438184?text=Hola%2C%20tengo%20una%20duda"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsappLink}
              >
                WhatsApp
              </a>
            </p>
            <p className={styles.footerNote}>
              El formulario de registro del negocio podrá ser enviado por única vez.
            </p>
          </div>
        </footer>
      </div>
    );
  }
  