package com.example.centinelanativedroid.ui.login;

import android.app.ProgressDialog;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.example.centinelanativedroid.MainActivity;
import com.example.centinelanativedroid.R;
import com.example.centinelanativedroid.models.UsuarioModel;
import com.example.centinelanativedroid.service.serviceAPI;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.util.HashMap;

public class LoginActivity extends AppCompatActivity {

    private String line;
    private int responseCode;
    private JSONObject jsonObject;
    private InputStream inputStream;
    private StringBuilder builderResult;
    private HttpURLConnection connection;
    private BufferedReader bufferedReader;

    private Button btnLogin;
    private EditText txtUsername;
    private EditText txtPassword;
    private TextView txtResultado;
    private UsuarioModel usuarioModel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        getSupportActionBar().hide();

        usuarioModel = new UsuarioModel();

        txtResultado = (TextView) findViewById(R.id.txtResultado);
        txtUsername = (EditText) findViewById(R.id.txtUsername);
        txtPassword = (EditText) findViewById(R.id.txtPassword);

        btnLogin = (Button) findViewById(R.id.btnLogin);
        btnLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                usuarioModel.setNombre_usuario(txtUsername.getText().toString());
                usuarioModel.setPassword(txtPassword.getText().toString());
                new loginAsync().execute();
            }
        });
    }

    private class loginAsync extends AsyncTask<String, String, JSONObject> {
        private ProgressDialog progressDialog;
        serviceAPI serviceAPI = new serviceAPI();

        @Override
        protected void onPreExecute() {
            super.onPreExecute();
            progressDialog = new ProgressDialog(LoginActivity.this);
            progressDialog.setMessage("Iniciando sesión");
            progressDialog.setTitle("Iniciando sesión");
            progressDialog.setIndeterminate(false);
            progressDialog.setCancelable(true);
            progressDialog.show();
        }

        @Override
        protected JSONObject doInBackground(String... strings) {
            try {
                HashMap<String, String> params = new HashMap<>();
                params.put("nombre", usuarioModel.getNombre_usuario());
                params.put("password", usuarioModel.getPassword());
                connection = serviceAPI.login(params);

                try {
                    responseCode = connection.getResponseCode();
                    if (responseCode == 404){
                        inputStream = new BufferedInputStream(connection.getErrorStream());
                        bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
                        builderResult = new StringBuilder();
                        while ((line = bufferedReader.readLine()) != null){
                            builderResult.append(line);
                        }
                        try {
                            jsonObject = new JSONObject(builderResult.toString());
                        } catch (JSONException jsonException){
                            jsonException.printStackTrace();
                        }

                        if (jsonObject != null){
                            txtResultado.setText(jsonObject.getString("Datos"));
                        }
                    } else if (responseCode == 200){
                        inputStream = new BufferedInputStream(connection.getInputStream());
                        bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
                        builderResult = new StringBuilder();
                        while ((line = bufferedReader.readLine()) != null){
                            builderResult.append(line);
                        }
                        try {
                            jsonObject = new JSONObject(builderResult.toString());
                        } catch (JSONException jsonException){
                            jsonException.printStackTrace();
                        }

                        if (jsonObject != null){
                            JSONArray jsonArray = jsonObject.optJSONArray("Datos");
                            for (int i = 0; i < jsonArray.length(); i++){
                                JSONObject jsonObjectUsuario = jsonArray.getJSONObject(i);
                                usuarioModel.setNombre(jsonObjectUsuario.getString("nombre"));
                                JSONObject jsonObjectUser = jsonObjectUsuario.getJSONObject("usuario");
                                for (int j = 0; j < jsonObjectUser.length(); j++){
                                    usuarioModel.setNombre_usuario(jsonObjectUser.getString("email"));
                                }
                            }
                        }
                    } else {
                        txtResultado.setText("Error, el servidor no está disponible.");
                    }
                } catch (IOException e){
                    e.printStackTrace();
                }
                return jsonObject;
            } catch (Exception e){
                e.printStackTrace();
            }
            return null;
        }

        @Override
        protected void onPostExecute(JSONObject jsonObject) {
            if (progressDialog != null && progressDialog.isShowing()){
                progressDialog.dismiss();
            }
            if (responseCode == 200){
                Intent intent = new Intent(LoginActivity.this, MainActivity.class);
                startActivity(intent);
            }
        }
    }
}