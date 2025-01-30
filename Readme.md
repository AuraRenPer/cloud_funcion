

#### Comando para subir a cloud function
```bash

gcloud functions deploy practica1 --entry-point=practica1 --runtime=nodejs22 --trigger-http --allow-unauthenticated --set-env-vars MONGODB_URI="mongodb+srv://vercel-admin-user-65fb2e3d44111d563879d1a1:C1VKKnDwRgB8POkb@cluster0.thoslsf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

  ```
#### Comando para subir a cloud function con todas las variables de entorno
```bash

gcloud functions deploy practica1 --entry-point=practica1 --runtime=nodejs22 --trigger-http --allow-unauthenticated --set-env-vars MONGODB_URI="mongodb+srv://vercel-admin-user-65fb2e3d44111d563879d1a1:C1VKKnDwRgB8POkb@cluster0.thoslsf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" --set-env-vars JWT_SECRET="96486bce1d36064326bbaa45a5591aa96df082412bbf073eb5785f9eab3a2ff"

gcloud functions deploy practica1 --entry-point=practica1 --runtime=nodejs22 --trigger-http --allow-unauthenticated --set-env-vars MONGODB_URI="mongodb+srv://vercel-admin-user-65fb2e3d44111d563879d1a1:C1VKKnDwRgB8POkb@cluster0.thoslsf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" --set-env-vars JWT_SECRET="96486bce1d36064326bbaa45a5591aa96df082412bbf073eb5785f9eab3a2ff"

gcloud functions deploy practica1 --entry-point=practica1 --runtime=nodejs22 --trigger-http --allow-unauthenticated --set-env-vars MONGODB_URI="mongodb+srv://vercel-admin-user-65fb2e3d44111d563879d1a1:C1VKKnDwRgB8POkb@cluster0.thoslsf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",JWT_SECRET="96486bce1d36064326bbaa45a5591aa96df082412bbf073eb5785f9eab3a2ff"

gcloud functions deploy practica1 --entry-point=practica1 --runtime=nodejs22 --trigger-http --allow-unauthenticated --set-env-vars MONGODB_URI="mongodb+srv://vercel-admin-user-xxxx:xxxx@cluster0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" --set-env-vars JWT_SECRET="96486bce1d36064326bbaa45a5591aa96df082412bbf073eb5785f9eab3a2ff"

### Desplegar siin funcion --set-env-vars

gcloud functions deploy practica1 --entry-point=practica1 --runtime=nodejs22 --trigger-http --allow-unauthenticated


### Ultima

gcloud functions deploy practica1 --set-env-vars "MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" --set-env-vars "JWT_SECRET=96486bce1d36064326bbaa45a5591aa96df082412bbf073eb5785f9eab3a2ff"



gcloud functions deploy practica1 --set-env-vars=MONGODB_URI="mongodb+srv://vercel-admin-user-65fb2e3d44111d563879d1a1:C1VKKnDwRgB8POkb@cluster0.thoslsf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

  ```

#### Comando para eliminar todas las variables de entorno
```bash

gcloud functions deploy practica1 --entry-point=practica1 --runtime=nodejs22 --trigger-http --allow-unauthenticated --clear-env-vars
  ```

#### Comando para configurar correctamente mongo y jwt en google cloud (Register y Login) LAS CHIDAS
```bash

gcloud functions deploy uteq-register --region=us-central1 --gen2 --entry-point=register --runtime=nodejs20 --trigger-http   --allow-unauthenticated --source=src --set-env-vars MONGODB_URI="mongodb+srv://vercel-admin-user-65fb2e3d44111d563879d1a1:C1VKKnDwRgB8POkb@cluster0.thoslsf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",JWT_SECRET="96486bce1d36064326bbaa45a5591aa96df082412bbf073eb5785f9eab3a2ff"

gcloud functions deploy uteq-register --region=us-central1 --gen2 --entry-point=register --runtime=nodejs20 --trigger-http   --allow-unauthenticated --source=. --set-env-vars MONGODB_URI="mongodb+srv://vercel-admin-user-65fb2e3d44111d563879d1a1:C1VKKnDwRgB8POkb@cluster0.thoslsf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",JWT_SECRET="tu_jwt_secret"


gcloud functions deploy uteq-register --region=us-central1 --gen2 --entry-point=register --runtime=nodejs20 --trigger-http   --allow-unauthenticated --source=. --set-env-vars MONGODB_URI="mongodb+srv://vercel-admin-user-65fb2e3d44111d563879d1a1:C1VKKnDwRgB8POkb@cluster0.thoslsf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",JWT_SECRET="96486bce1d36064326bbaa45a5591aa96df082412bbf073eb5785f9eab3a2ff"

gcloud functions deploy uteq-register --region=us-central1 --gen2 --entry-point=register --runtime=nodejs20 --trigger-http --allow-unauthenticated --source=. --set-env-vars MONGODB_URI="mongodb+srv://vercel-admin-user-65fb2e3d44111d563879d1a1:C1VKKnDwRgB8POkb@cluster0.thoslsf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",JWT_SECRET="96486bce1d36064326bbaa45a5591aa96df082412bbf073eb5785f9eab3a2ff"

gcloud functions deploy uteq-register --region=us-central1 --gen2 --entry-point=app --runtime=nodejs20 --trigger-http --allow-unauthenticated --source=. --set-env-vars MONGODB_URI="mongodb+srv://vercel-admin-user-65fb2e3d44111d563879d1a1:C1VKKnDwRgB8POkb@cluster0.thoslsf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",JWT_SECRET="96486bce1d36064326bbaa45a5591aa96df082412bbf073eb5785f9eab3a2ff"


gcloud functions deploy uteq-register --region=us-central1 --gen2 --entry-point=register --runtime=nodejs20 --trigger-http  --allow-unauthenticated --source=. --set-env-vars MONGODB_URI="mongodb+srv://vercel-admin-user-65fb2e3d44111d563879d1a1:C1VKKnDwRgB8POkb@cluster0.thoslsf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",JWT_SECRET="96486bce1d36064326bbaa45a5591aa96df082412bbf073eb5785f9eab3a2ff"

gcloud functions deploy uteq-register --region=us-central1 --gen2 --entry-point=register --runtime=nodejs20 --trigger-http  --allow-unauthenticated --source=. --set-env-vars MONGODB_URI="mongodb+srv://vercel-admin-user-65fb2e3d44111d563879d1a1:C1VKKnDwRgB8POkb@cluster0.thoslsf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",JWT_SECRET="96486bce1d36064326bbaa45a5591aa96df082412bbf073eb5785f9eab3a2ff"

gcloud functions deploy uteq-register --region=us-central1 --gen2 --entry-point=register --runtime=nodejs20 --trigger-http   --allow-unauthenticated --source=. --set-env-vars MONGODB_URI="mongodb+srv://vercel-admin-user-65fb2e3d44111d563879d1a1:C1VKKnDwRgB8POkb@cluster0.thoslsf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",JWT_SECRET="96486bce1d36064326bbaa45a5591aa96df082412bbf073eb5785f9eab3a2ff"



  ```