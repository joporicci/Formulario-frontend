import InputField from "./InputField";
import CheckBoxGroup from "./CheckBoxGroup";

export default function NewForm (){

    const paymentMethods =["Efectivo","Transferencia","Tarjeta de crédito","Tarjeta de débito","Criptomonedas"];
    const general=["Atención bilingue","Reservas online","Cancelación flexible","Atención las 24 horas","Servicio de emergencia","Personal capacitado para primeros auxilios","Eventos y celebraciones privadas","Espacios climatizados"];
    const accesibility = ["Rampa/s para silla de ruedas","Baños adaptados","sistencia para personas con movilidad reducidad"];
    const gastronomy = ["Menú para celíacos","Opciones veganas y vegetarianas","Menú infantil","Delivery","Takeaway","Carta de vinos","Cerveza artesanal","Espectaculos en vivo","Música ambiental"];
    const connectivity= ["Wifi gratuito para clientes","Opciones de carga rápida","Espacio de coworking"];
    const additional  = ["Puntos de reciclaje","Espacio pet friendly"];
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Completá este formulario para crear tu landing page personalizada y destacar en nuestra plataforma</h1>
            <InputField label="Nombre de fantasía" id="fantasyname"register={register}error={errors.fantasyname} placeholder="Ejemplo: Hotel Sol de mar"/>
            <InputField label="Rubro principal" id="category" register={register}error={errors.category}placeholder="(Ejemplo: Turismo, Gastronomía, Salud, Tecnología, etc.)"/>
            <InputField label="Subrubro" id="category" register={register}error={errors.category}placeholder="(Ejemplo: Pizzería, Alquiler de sombrillas, Psicólogo, Electricista, etc.)"/>
            <InputField label= "Descripción" id="description" register={register} error={errors.description} placeholder="(Incluye qué ofreces, especialidades y diferenciadores.)"/>
            <CheckBoxGroup legend="Métodos de pago"options={paymentMethods.map((id) => ({ id, label: id }))} register={register}/>
            <CheckBoxGroup legend ="General para todos los comercios" options={general.map((id)=>({id,label:id}))}register={register}/>
            <CheckBoxGroup legend="Accesibilidad" options={accesibility.map((id)=>({id,label:id}))}register={register}/>
            <CheckBoxGroup legend="Completá estas casillas si pertenecés al rubro gastronómico" options={gastronomy.map((id)=>({id,label:id}))}register={register}/>
            <CheckBoxGroup legend ="Conectividad y tecnología" options = {connectivity.map((id)=>({id,label:id}))}register={register}/>
            <CheckBoxGroup legend="Adicionales" options={additional.map((id)=>({id,label:id}))}register={register}/>
            <label htmlFor="coverPhoto" className={styles.label}>Foto de Portada</label>
            <input
            {...register('coverPhoto')}
            type="file"
            id="coverPhoto"
            accept="image/*"
            className={styles.fileInput}
            />

            <label htmlFor="gallery" className={styles.label}>Galería de Imágenes</label>
            <input
            {...register('gallery')}
            type="file"
            id="gallery"
            accept="image/*"
            multiple
            className={styles.fileInput}
            />
            <InputField label="Horarios de apertura" id="schedule" register={register}error={errors.schedule}placeholder="(Ejemplo Lunes a Viernes de 8:00 am a 20:00 pm)"/>
            <InputField label="Localidad" id="schedule" register={register}error={errors.schedule}placeholder="(Ejemplo: Villa Gesel"/>
            <InputField label="Calle" id="schedule" register={register}error={errors.schedule}placeholder="(Ejemplo: Avenida 3)"/>
            <InputField label="Número" id="schedule" register={register}error={errors.schedule}placeholder="(Ejemplo: 398)"/>
            <InputField label="Teléfono" id="schedule" register={register}error={errors.schedule}placeholder="Unicamente digitos"/>
            <InputField label="Página web" id="schedule" register={register}error={errors.schedule}placeholder="(Opcional)"/>
            <InputField label="Instagram" id="schedule" register={register}error={errors.schedule}placeholder="(Opcional)"/>

        </form>
    )
}