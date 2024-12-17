import { Testimonial } from "../models/Testimoniales.js";

const guardarTestimonial = async (req, res) => {
  const { nombre, correo, mensaje } = req.body;

  const errores = [];

  if (nombre.trim() === "") {
    errores.push({ mensaje: "El Nombre está vacio" });
  }
  if (correo.trim() === "") {
    errores.push({ mensaje: "El Correo está vacio" });
  }
  if (mensaje.trim() === "") {
    errores.push({ mensaje: "El Mensaje está vacio" });
    console.log(req.body);
  }

  if (errores.length > 0) {
    //consultar testimoniales existentes
    const testimoniales = await Testimonial.findAll();

    //mostrar vista con errores
    res.render("testimoniales", {
      pagina: "Testimoniales",
      errores,
      nombre,
      correo,
      mensaje,
      testimoniales,
    });
  } else {
    try {
      await Testimonial.create({
        nombre,
        correo,
        mensaje,
      });

      res.redirect("/testimoniales");
    } catch (error) {
      console.log(error);
    }
  }
};

export { guardarTestimonial };
