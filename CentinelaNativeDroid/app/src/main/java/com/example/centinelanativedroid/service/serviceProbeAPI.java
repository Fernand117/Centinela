package com.example.centinelanativedroid.service;

import android.util.Log;

import org.apache.commons.io.FileUtils;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.UUID;

public class serviceProbeAPI {
    String charset = "UTF-8";
    HttpURLConnection conn;
    DataOutputStream wr;
    StringBuilder result;
    URL urlObj;
    JSONArray jsonArray = null;
    JSONObject jsonObject = null;
    StringBuilder sbParams;
    String paramsString;
    File fileImage;

    public JSONArray makeHttpRequestArray(String url, String method, HashMap<String, String> params) {
        sbParams = new StringBuilder();
        int i = 0;
        for (String key : params.keySet()) {
            try {
                if (i != 0){
                    sbParams.append("&");
                }
                sbParams.append(key).append("=")
                        .append(URLEncoder.encode(params.get(key), charset));
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            i++;
        }

        if (method.equals("POST")) {
            // request method is POST
            try {
                urlObj = new URL(url);
                conn = (HttpURLConnection) urlObj.openConnection();
                conn.setDoOutput(true);
                conn.setRequestMethod("POST");
                conn.setRequestProperty("Accept-Charset", charset);
                conn.setReadTimeout(10000);
                conn.setConnectTimeout(15000);
                conn.connect();
                paramsString = sbParams.toString();
                wr = new DataOutputStream(conn.getOutputStream());
                wr.writeBytes(paramsString);
                wr.flush();
                wr.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        else if(method.equals("GET")){
            if (sbParams.length() != 0) {
                url += "?" + sbParams.toString();
            }
            try {
                urlObj = new URL(url);
                conn = (HttpURLConnection) urlObj.openConnection();
                conn.setDoOutput(false);
                conn.setRequestMethod("GET");
                conn.setRequestProperty("Accept-Charset", charset);
                conn.setConnectTimeout(15000);
                conn.connect();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        try {
            InputStream in = new BufferedInputStream(conn.getInputStream());
            BufferedReader reader = new BufferedReader(new InputStreamReader(in));
            result = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                result.append(line);
            }
            Log.d("JSON Parser", "result: " + result.toString());
        } catch (IOException e) {
            e.printStackTrace();
        }
        conn.disconnect();
        try {
            jsonArray = new JSONArray(result.toString());
        } catch (JSONException e) {
            Log.e("JSON Parser", "Error parsing data " + e.toString());
        }
        return jsonArray;
    }
    //Método que obtiene la información como JSONObject
    public JSONObject makeHttpRequestObject(String url, String method, HashMap<String, String> params) {
        sbParams = new StringBuilder();
        int i = 0;
        for (String key : params.keySet()) {
            try {
                if (i != 0){
                    sbParams.append("&");
                }
                sbParams.append(key).append("=")
                        .append(URLEncoder.encode(params.get(key), charset));
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            i++;
        }

        if (method.equals("POST")) {
            // request method is POST
            try {
                urlObj = new URL(url);
                conn = (HttpURLConnection) urlObj.openConnection();
                conn.setDoOutput(true);
                conn.setRequestMethod("POST");
                conn.setRequestProperty("Accept-Charset", charset);
                conn.setReadTimeout(10000);
                conn.setConnectTimeout(15000);
                conn.connect();
                paramsString = sbParams.toString();
                wr = new DataOutputStream(conn.getOutputStream());
                wr.writeBytes(paramsString);
                wr.flush();
                wr.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        else if(method.equals("GET")){
            if (sbParams.length() != 0) {
                url += "?" + sbParams.toString();
            }
            try {
                urlObj = new URL(url);
                conn = (HttpURLConnection) urlObj.openConnection();
                conn.setDoOutput(false);
                conn.setRequestMethod("GET");
                conn.setRequestProperty("Accept-Charset", charset);
                conn.setConnectTimeout(15000);
                conn.connect();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        try {
            InputStream in = new BufferedInputStream(conn.getInputStream());
            BufferedReader reader = new BufferedReader(new InputStreamReader(in));
            result = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                result.append(line);
            }
            Log.d("JSON Parser", "result: " + result.toString());
        } catch (IOException e) {
            e.printStackTrace();
        }
        conn.disconnect();
        try {
            //Convierte a JSONObject
            jsonObject = new JSONObject(result.toString());
        } catch (JSONException e) {
            Log.e("JSON Parser", "Error parsing data " + e.toString());
        }
        return jsonObject;
    }

    //Método que obtiene la información como JSONObject
    public String makeHttpRequestObjectFiles(String url, String nombre, File file) throws IOException {
        //Tengo un File global al cual le asgigno el file que mando desde el activity
        fileImage = file;
        String result = "";
        URL urlImg = new URL(url);
        HttpURLConnection connection = (HttpURLConnection) urlImg.openConnection();
        String boundary = UUID.randomUUID().toString();
        connection.setRequestMethod("POST");
        connection.setDoOutput(true);
        connection.setRequestProperty("Content-Type", "multipart/form-data;boundary=" + boundary);
        DataOutputStream request = new DataOutputStream(connection.getOutputStream());
        request.writeBytes("--" + boundary + "\r\n");
        //Aquí es donde mando el nombre de la categoria
        request.writeBytes("Content-Disposition: Content-Type: text/plain;form-data; name=\"nombre\"\r\n\r\n");
        request.writeBytes(nombre + "\r\n");
        request.writeBytes("--" + boundary + "\r\n");
        //Aquí donde recibo el file
        request.writeBytes("Content-Disposition: form-data; name=\"imagen\"; filename=\"" +
                fileImage + "\"\r\n\r\n");
        //Este no se que hace ralmente pero pues aquí lo dejo por si las dudas
        request.write(FileUtils.readFileToByteArray(fileImage));
        request.writeBytes("\r\n");
        request.writeBytes("--" + boundary + "--\r\n");
        request.flush();
        String resultCode = connection.getResponseMessage();
        if (connection.getResponseMessage() == resultCode){
            result = "Los datos se han registrador correctamente.";
        } else {
            result = "Lo sentimos ocurrió un problema.";
        }
        return result;
    }

    public String makeSubcategorias(String url, String nombre, int idCategoria, File file) throws IOException {
        //Tengo un File global al cual le asgigno el file que mando desde el activity
        fileImage = file;
        String result = "";
        URL urlImg = new URL(url);
        HttpURLConnection connection = (HttpURLConnection) urlImg.openConnection();
        String boundary = UUID.randomUUID().toString();
        connection.setRequestMethod("POST");
        connection.setDoOutput(true);
        connection.setRequestProperty("Content-Type", "multipart/form-data;boundary=" + boundary);
        DataOutputStream request = new DataOutputStream(connection.getOutputStream());
        request.writeBytes("--" + boundary + "\r\n");
        //Aquí es donde mando el nombre de la categoria
        request.writeBytes("Content-Disposition: Content-Type: text/plain;form-data; name=\"nombre\"\r\n\r\n");
        request.writeBytes(nombre + "\r\n");
        request.writeBytes("--" + boundary + "\r\n");

        //Aquí es donde mando el nombre de la categoria
        request.writeBytes("Content-Disposition: Content-Type: text/plain;form-data; name=\"idcategoria\"\r\n\r\n");
        request.writeBytes(idCategoria + "\r\n");
        request.writeBytes("--" + boundary + "\r\n");

        //Aquí donde recibo el file
        request.writeBytes("Content-Disposition: form-data; name=\"imagen\"; filename=\"" +
                fileImage + "\"\r\n\r\n");
        //Este no se que hace ralmente pero pues aquí lo dejo por si las dudas
        request.write(FileUtils.readFileToByteArray(fileImage));
        request.writeBytes("\r\n");
        request.writeBytes("--" + boundary + "--\r\n");
        request.flush();
        String resultCode = connection.getResponseMessage();
        if (connection.getResponseMessage() == resultCode){
            result = "Los datos se han registrador correctamente.";
        } else {
            result = "Lo sentimos ocurrió un problema.";
        }
        return result;
    }

    public String makeProductos(String url, int codigo ,String nombre, String descripcion, float precio, int idCategoria, int idSubcategoria, int idMarca, int idProvedor, File file) throws IOException {
        //Tengo un File global al cual le asgigno el file que mando desde el activity
        fileImage = file;
        String result = "";
        URL urlImg = new URL(url);
        HttpURLConnection connection = (HttpURLConnection) urlImg.openConnection();
        String boundary = UUID.randomUUID().toString();
        connection.setRequestMethod("POST");
        connection.setDoOutput(true);
        connection.setRequestProperty("Content-Type", "multipart/form-data;boundary=" + boundary);
        DataOutputStream request = new DataOutputStream(connection.getOutputStream());
        request.writeBytes("--" + boundary + "\r\n");

        //Aquí es donde mando el nombre de la categoria
        request.writeBytes("Content-Disposition: Content-Type: text/plain;form-data; name=\"codigo\"\r\n\r\n");
        request.writeBytes(codigo + "\r\n");
        request.writeBytes("--" + boundary + "\r\n");

        //Aquí es donde mando el nombre de la categoria
        request.writeBytes("Content-Disposition: Content-Type: text/plain;form-data; name=\"nombre\"\r\n\r\n");
        request.writeBytes(nombre + "\r\n");
        request.writeBytes("--" + boundary + "\r\n");

        //Aquí es donde mando el nombre de la categoria
        request.writeBytes("Content-Disposition: Content-Type: text/plain;form-data; name=\"descripcion\"\r\n\r\n");
        request.writeBytes(descripcion + "\r\n");
        request.writeBytes("--" + boundary + "\r\n");

        //Aquí es donde mando el nombre de la categoria
        request.writeBytes("Content-Disposition: Content-Type: text/plain;form-data; name=\"idcategoria\"\r\n\r\n");
        request.writeBytes(idCategoria + "\r\n");
        request.writeBytes("--" + boundary + "\r\n");

        //Aquí es donde mando el nombre de la categoria
        request.writeBytes("Content-Disposition: Content-Type: text/plain;form-data; name=\"idsubcategoria\"\r\n\r\n");
        request.writeBytes(idSubcategoria + "\r\n");
        request.writeBytes("--" + boundary + "\r\n");

        //Aquí es donde mando el nombre de la categoria
        request.writeBytes("Content-Disposition: Content-Type: text/plain;form-data; name=\"idmarca\"\r\n\r\n");
        request.writeBytes(idMarca + "\r\n");
        request.writeBytes("--" + boundary + "\r\n");

        //Aquí es donde mando el nombre de la categoria
        request.writeBytes("Content-Disposition: Content-Type: text/plain;form-data; name=\"idprovedor\"\r\n\r\n");
        request.writeBytes(idProvedor + "\r\n");
        request.writeBytes("--" + boundary + "\r\n");

        //Aquí es donde mando el nombre de la categoria
        request.writeBytes("Content-Disposition: Content-Type: text/plain;form-data; name=\"precio\"\r\n\r\n");
        request.writeBytes(precio + "\r\n");
        request.writeBytes("--" + boundary + "\r\n");

        //Aquí donde recibo el file
        request.writeBytes("Content-Disposition: form-data; name=\"imagen\"; filename=\"" +
                fileImage + "\"\r\n\r\n");
        //Este no se que hace ralmente pero pues aquí lo dejo por si las dudas
        request.write(FileUtils.readFileToByteArray(fileImage));
        request.writeBytes("\r\n");
        request.writeBytes("--" + boundary + "--\r\n");
        request.flush();
        String resultCode = connection.getResponseMessage();
        if (connection.getResponseMessage() == resultCode){
            result = "Los datos se han registrador correctamente.";
        } else {
            result = "Lo sentimos ocurrió un problema.";
        }
        return result;
    }
}
