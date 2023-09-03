<?php

namespace App\Http\Controllers;

use App\Models\User;
use Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request){
        //validacion de campos del formulario registro
        $validator = Validator::make($request->all(), [
            'name' => 'required | string',
            'email' => 'required | email | unique:users',
            'password' => 'required | string | min:8',
        ]);
        //si validacion falla retorna el error
        if($validator->fails()){
            
            return response()->json([
                'message' => 'Datos Incorrectos'
            ]);
        }

        //creacion de usuario si pasa la validacion
        $user =  User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);
        //se genera un token de autenticacion para el usuario
        $token =  $user->createToken('auth_token')->plainTextToken;

        //se retorna la info del usuario en formato json
        
        return response()->json([
            'message' => 'Bienvenido '.$user->name,
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user
        ]);
        
    }

    public function login(Request $request){
        //con los datos recibidos intenta autenticarse
        if(!Auth::attempt($request->only('email', 'password')))
        {
            return response()->json([
                'message' => 'Error en Credenciales'
            ], 401);
        }
        //si datos son correctos se realiza busqueda de info del usuario en BD
        $user =  User::where('email', $request->email)->firstOrFail();
        //genera el token de autenticacion para el usuario
        $token =  $user->createToken('auth_token')->plainTextToken;

        //se retorna la info del usuario en formato json
        return response()->json([
            'message' => 'Bienvenido '.$user->name,
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user
        ]);
    }

    public function checkToken(){
        
        
        //dd(auth()->user()->currentAccessToken()->token);

        //valida que el usuario tenga un token activo y retorna la info del mismo
        return response()->json([
            'message' => 'Token Valido',
            'access_token' => auth()->user()->currentAccessToken()->token,
            'token_type' => 'Bearer',
            'user' => auth()->user()
        ]);
    }

    public function logout(){
        //se eliminan los token asociados a la sesion del usuario
        auth()->user()->tokens()->delete();

        return [
            'message' => "Cerraste Sesión Correctamente",
        ];
    }
}
