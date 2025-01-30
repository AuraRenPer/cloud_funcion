

#### Comando para subir a cloud function
```bash

gcloud functions deploy practica1 --entry-point=practica1 --runtime=nodejs22 --trigger-http --allow-unauthenticated --set-env-vars MONGODB_URI="mongodb+srv://vercel-admin-user-65fb2e3d44111d563879d1a1:C1VKKnDwRgB8POkb@cluster0.thoslsf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"


  ```

### Es la buena de cada uno
```bash

gcloud functions deploy uteq-register --region=us-central1 --gen2 --entry-point=register --runtime=nodejs20 --trigger-http  --allow-unauthenticated --source=src/functions/register --set-env-vars MONGODB_URI="mongodb+srv://vercel-admin-user-65fb2e3d44111d563879d1a1:C1VKKnDwRgB8POkb@cluster0.thoslsf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",JWT_SECRET="96486bce1d36064326bbaa45a5591aa96df082412bbf073eb5785f9eab3a2ff", PORT=8080ongodb.net/myFirstDatabase?retryWrites=true&w=majority",JWT_SECRET="96486bce1d36064326bbaa45a5591aa96df082412bbf073eb5785f9eab3a2ff"

gcloud functions deploy uteq-login --region=us-central1 --gen2 --entry-point=login --runtime=nodejs20 --trigger-http  --allow-unauthenticated --source=src/functions/login --set-env-vars MONGODB_URI="mongodb+srv://vercel-admin-user-65fb2e3d44111d563879d1a1:C1VKKnDwRgB8POkb@cluster0.thoslsf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",JWT_SECRET="96486bce1d36064326bbaa45a5591aa96df082412bbf073eb5785f9eab3a2ff", PORT=8080

gcloud functions deploy uteq-update --region=us-central1 --gen2 --entry-point=updateUser --runtime=nodejs20 --trigger-http  --allow-unauthenticated --source=src/functions/update --set-env-vars MONGODB_URI="mongodb+srv://vercel-admin-user-65fb2e3d44111d563879d1a1:C1VKKnDwRgB8POkb@cluster0.thoslsf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",JWT_SECRET="96486bce1d36064326bbaa45a5591aa96df082412bbf073eb5785f9eab3a2ff", PORT=8080


gcloud functions deploy uteq-delete --region=us-central1 --gen2 --entry-point=deleteUser --runtime=nodejs20 --trigger-http  --allow-unauthenticated --source=src/functions/delete --set-env-vars MONGODB_URI="mongodb+srv://vercel-admin-user-65fb2e3d44111d563879d1a1:C1VKKnDwRgB8POkb@cluster0.thoslsf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",JWT_SECRET="96486bce1d36064326bbaa45a5591aa96df082412bbf073eb5785f9eab3a2ff", PORT=8080

  ```